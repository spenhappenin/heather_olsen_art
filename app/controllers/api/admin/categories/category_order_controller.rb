class Api::Admin::Categories::CategoryOrderController < ApplicationController
  include AdminCheck

  def update
    category = Category.find_by(position: params[:old_index])
    category.insert_at(params[:new_index].to_i)
    render json: Category.order(position: :asc)
  end
end
