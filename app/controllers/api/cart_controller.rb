class Api::CartController < ApplicationController

  def index
    render json: Artwork.artwork_in_cart(params[:items])
  end

  def check_availability
    cart = []
    params[:cart].each { |c| cart << JSON.parse(c) }
    unavailable = cart.select { |item| item if item["status"] == "sold" }.map { |i| i }

    message = generate_message(unavailable)
    render json: { status: "error", message: message, unavailable: unavailable }, status: 422 if unavailable.length > 0
  end

  private
    # TODO: Using this in charges controller
    def generate_message(unavailable)
      # TODO: Format message better
      message = "Error: Sorry, artwork is no longer available:"
      unavailable.map { |item| message << " #{item['title']}" }
      message
    end
end
