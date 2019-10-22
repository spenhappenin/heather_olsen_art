class Api::CategoriesController < ApplicationController

  def index
    render json: Category.where(published: true).order(position: :asc)
  end

  def show
    render json: Category.find(params[:id])
  end
end
