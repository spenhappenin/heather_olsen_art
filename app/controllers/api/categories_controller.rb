class Api::CategoriesController < ApplicationController
  def fetch_works
    render json: Category.all
  end
end
