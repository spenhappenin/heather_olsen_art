class Api::CategoriesController < ApplicationController
  def fetch_works
    render json: Category.all
  end

  def create
    # Category.create(title: params[:title], display_image: params[:display_image], link: params[:title].parameterize)
  end
end
