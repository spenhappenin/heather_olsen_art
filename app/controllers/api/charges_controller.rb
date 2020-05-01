class Api::ChargesController < ApplicationController
  before_action :check_availability, only: :create

  def create
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
    payment_method = params[:paymentMethod]
    cart = params[:cart]
    formattedCart = params[:formattedCart]
    user = params[:user]
    shipping_details = user[:shipping_details]
    billing_details = user[:billing_details]
    pickup = params[:pickup]
    payment_source = params[:paymentSource]

    # Totals
    amount_obj = params[:user][:amount]
    formatted_amount_obj = params[:user][:formattedAmount]
    sub_total = params[:user][:amount][:subTotal]
    shipping_total = params[:user][:amount][:shippingTotal]
    grand_total = params[:user][:amount][:grandTotal]

    proceed_to_payment = verify_charge(cart, amount_obj, pickup)
    # Totals match - proceed to payment
    if proceed_to_payment
      begin
        # Charge client
        charge = Stripe::Charge.create({
          amount: grand_total,
          currency: 'usd',
          source: payment_source[:id],
          description: "Charge for #{ user[:email] }"
        })
      rescue Stripe::CardError => e
        render json: { status: "error", message: e.error.message }, status: 422
      rescue => e
        render json: { status: "error", message: "Sorry, something went wrong. If this issue persists contact the artists." }, status: 422
      end

      # Create invoice and change status of artwork
      order = Order.create(
        first_name: shipping_details[:first_name],
        last_name: shipping_details[:last_name],
        email: user[:email],
        sub_total: sub_total,
        shipping_total: shipping_total
      )

      cart.each { |artwork| ArtOrder.create(order_id: order.id, artwork_id: artwork[:id]) }
      Artwork.update_status_to_sold(cart)

      # Email invoice
      ChargesMailer.with(
        data: {
          charge: charge,
          shipping_details: shipping_details,
          amount: amount_obj,
          formatted_amount: formatted_amount_obj,
          cart: cart,
          pickup: pickup,
          order: order,
        },
        email: user[:email],
        full_name: "#{user[:first_name]} #{user[:last_name]}",
        formatted_cart: params[:formattedCart]
      ).invoice.deliver_now

      # ChargesMailer.with(
      #   data: {
      #     charge: charge,
      #     shipping_details: shipping_details,
      #     amount: amount_obj,
      #     formatted_amount: formatted_amount_obj,
      #     cart: cart,
      #     pickup: pickup,
      #     order: order,
      #   },
      #   email: "heatherolsenart@gmail.com",
      #   full_name: "#{user[:first_name]} #{user[:last_name]}",
      #   formatted_cart: params[:formattedCart]
      # ).invoice.deliver_now

    # Totals do not match - render error
    else
      render json: { status: "error", message: "Sorry, something went wrong. If this issue persists contact the artists." }, status: 422
    end
  end

  private
    def verify_charge(cart, amount, pickup)
      # Calculate and verify payment amount
      cart_total = 0
      cart.each { |c| cart_total += c[:price] }
      return false if cart_total != amount[:subTotal]

      # TODO: Make dynamic - only works for flat rate price for butterflies
      # Calculate and verify shipping cost
      shipping_total = 0
      if !pickup
        shipping_total = cart.count >= 4 ? 2999 : 1499
      end
      return false if shipping_total != amount[:shippingTotal]

      true
    end

    def check_availability
      cart = params[:cart]
      unavailable = cart.select { |item| item if item[:status] == "sold" }.map { |i| i }
      message = generate_message(unavailable)
      render json: { status: "error", message: message, unavailable: unavailable }, status: 422 if unavailable.length > 0
    end

    def generate_message(unavailable)
      # TODO: Format message better
      message = "Error: Sorry, artwork is no longer available:"
      unavailable.map { |item| message << " #{item[:title]}" }
      message
    end

end
