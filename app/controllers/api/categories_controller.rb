class Api::CategoriesController < ApplicationController
  before_action :set_category, only: [:single_category, :update, :destroy]

  def fetch_works
    render json: Category.all
  end

  def single_category
    render json: @category
  end

  def create
    category = Category.create(
      title: params[:title], 
      display_image: params[:display_image], 
      route: params[:title].parameterize
    )
    render json: category
  end

  def update
    @category.update(
      title: params[:title], 
      display_image: params[:display_image], 
      route: params[:title].parameterize
    )
    render json: @category
  end

  def destroy
    @category.destroy
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end
end
