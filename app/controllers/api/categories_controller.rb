class Api::CategoriesController < ApplicationController
  before_action :set_category, only: [:single_category, :update, :destroy]

  def fetch_works
    render json: Category.all
  end

  def single_category
    render json: @category
  end

  def create
    render json: Category.create(
      title: params[:title], 
      display_image: params[:display_image], 
      route: params[:title].parameterize
    )
  end

  def update
    render json: @category.update(
      title: params[:title], 
      display_image: params[:display_image], 
      route: params[:title].parameterize
    )
  end

  def destroy
    @category.destroy
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end
end
