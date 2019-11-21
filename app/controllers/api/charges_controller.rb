class Api::ChargesController < ApplicationController

  def create    
    Stripe.api_key = ENV["STRIPE_SECRET_KEY"]
    token = params[:token]
    amount = params[:user][:amount].to_i * 100
    user = params[:user]
    
    # 1) Charge client
    charge = Stripe::Charge.create({
      amount: amount,
      currency: 'usd',
      source: 'tok_visa',
      description: "Charge for #{user[:email]}",
    })

    # 2) Email invoice to client
    # ChargesMailer.with(charge: charge, email: params[:email]).invoice.deliver_now

    # 3) Email Heather with client information
    # ChargesMailer.order(charge)

    # 4) Redirect user to new page
  end

end
