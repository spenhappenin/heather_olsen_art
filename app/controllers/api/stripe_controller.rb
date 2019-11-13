class Api::StripeController < ApplicationController

  def process_payment
    token = params[:token]
    amount = params[:amount].to_i * 100
    charge = Stripe::Charge.create(
      # render json: Stripe::Charge.create(
        amount: amount, 
        currency: "usd", 
        source: "tok_visa", 
        description: "Something about the customer..."
      # )
    # binding.pry
  end

end
