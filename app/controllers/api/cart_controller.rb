class Api::CartController < ApplicationController
  def index    
    render json: Artwork.artwork_in_cart(params[:items])
  end
end
