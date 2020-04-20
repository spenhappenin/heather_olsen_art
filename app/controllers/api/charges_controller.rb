class Api::ChargesController < ApplicationController  

  def create
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
    payment_method = params[:paymentMethod]
    amount = params[:user][:amount][:grandTotal].to_i * 100
    user = params[:user]

    # TODO: Make sure payment and shipping is accurate on the backend too
    proceed = verify_charge(params[:cart], params[:user][:amount], params[:pickup])

    if proceed
      # TODO: This might not be the way to do this - it might have to come from react-stripe?
      billing_details = user[:billing_details]
      billing_details[:state] = user[:billing_details][:custState]

      shipping = user[:shipping]
      shipping[:state] = user[:shipping][:custState]

      # 1) Charge client
      charge = Stripe::Charge.create({
        amount: amount,
        currency: 'usd',
        source: 'tok_visa',
        description: "Charge for #{user[:email]}",
        # billing_details: { address: billing_details },
        # shipping: { address: shipping }
        # receipt_email: ""
        # status: ""
      })

      # 2) Email invoice to client
      # ChargesMailer.with(charge: charge, email: params[:email]).invoice.deliver_now

      # 3) Email Heather with client information
      # ChargesMailer.order(charge)

      # 4) Redirect user to new page
    else
      # TODO: return error message
    end
  end

  private
    def verify_charge(cart, amount, pickup)
      # Calculate and verify payment amount
      cart_total = 0
      cart.each { |c| cart_total += c[:price] }
      return false if cart_total != amount[:subTotal].to_i * 100

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
