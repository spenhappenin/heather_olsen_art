class Api::CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]

  def index
    render json: Category.order(position: :asc)
  end

  def show
    render json: @category
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

  def change_order
    binding.pry
    category = Category.find_by(position: params[:old_index])
    category.insert_at(params[:new_index])
    render json: Category.order(position: :asc)
  end

  # def poop
  #   category = Category.find_by(position: params[:old_index])
  #   category.insert_at(params[:new_index])
  #   render json: Category.order(position: :asc)
  # end
  
  private
    def set_category
      binding.pry
      @category = Category.find(params[:id])
    end

    def category_params
      params.require(:category).permit(:title, :display_image, :position)
    end
end
