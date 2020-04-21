class Api::ChargesController < ApplicationController

  def create
    # TODO: Check if artworks are available
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
    payment_method = params[:paymentMethod]
    cart = params[:cart]
    user = params[:user]
    pickup = params[:pickup]

    # Totals
    amount_obj = params[:user][:amount]
    sub_total = params[:user][:amount][:subTotal].gsub(".", "").to_i
    shipping_total = params[:user][:amount][:shippingTotal].gsub(".", "").to_i
    grand_total = params[:user][:amount][:grandTotal].gsub(".", "").to_i

    proceed = verify_charge(cart, amount_obj, pickup)
    # Totals match - proceed to payment
    if proceed
      # TODO: This might not be the way to do this - it might have to come from react-stripe?
      # billing_details = user[:billing_details]
      # billing_details[:state] = user[:billing_details][:custState]
      # shipping = user[:shipping]
      # shipping[:state] = user[:shipping][:custState]

      # Charge client
      charge = Stripe::Charge.create({
        amount: grand_total,
        currency: 'usd',
        source: 'tok_visa',
        description: "Charge for #{ user[:email] }",
        # billing_details: { address: billing_details },
        # shipping: { address: shipping }
        # receipt_email: ""
        # status: ""
      })

      # Create invoice and change status of artwork
      order = Order.create(
        first_name: user[:first_name],
        last_name: user[:last_name],
        email: user[:email],
        sub_total: sub_total,
        shipping_total: shipping_total
      )

      # cart.each do |artwork|
      #   ao = ArtOrder.create(order_id: order.id, artwork_id: artwork[:id])
      # end
      cart.each { |artwork| ArtOrder.create(order_id: order.id, artwork_id: artwork[:id]) }
      Artwork.update_status_to_sold(cart)

      # Email invoice
      ChargesMailer.with(charge: charge, email: user[:email]).invoice.deliver_now
      ChargesMailer.with(charge: charge, email: "heatherolsenart@gmail.com").invoice.deliver_now

    # Totals do not match - render error
    else
      # TODO: return error message
    end
  end

  private
    def verify_charge(cart, amount, pickup)
      # Calculate and verify payment amount
      cart_total = 0
      cart.each { |c| cart_total += c[:price] }
      return false if cart_total != amount[:subTotal].gsub(".", "").to_i

      # TODO: Make dynamic - only works for flat rate price for butterflies
      # Calculate and verify shipping cost
      shipping_total = 0
      if !pickup
        shipping_total = cart.count >= 4 ? 2999 : 1499
      end
      return false if shipping_total != amount[:shippingTotal].gsub(".", "").to_i

      true
    end

end
