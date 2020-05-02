class Api::Admin::Orders::OrdersController < ApplicationController
  def index
    render json: Order.all
  end

  def show
    order = Order.find(params[:id])
    render json: {
      artworks: order.artworks,
      order: order
    }
  end
end
