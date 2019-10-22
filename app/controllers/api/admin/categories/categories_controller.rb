class Api::Admin::Categories::CategoriesController < ApplicationController  
  include AdminCheck
  before_action :set_category, except: [:index, :create]

  def index
    render json: Category.order(position: :asc)
  end

  def create
    category = Category.new(category_params)
    category.route = params[:title].parameterize
    if category.save
      render json: category
    else
      render_error(category)
    end
  end

  def update
    @category.route = params[:title].parameterize
    if @category.update(category_params)
      render json: @category
    else
      render_error(@category)
    end
  end

  def destroy
    unless @category.destroy
      render_error(@category)
    end
  end

  private
    def set_category
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:title, :display_image, :position, :published)
    end
end
