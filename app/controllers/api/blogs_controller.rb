class Api::BlogsController < ApplicationController  
  def index
    render json: Blog.all_blogs
  end

  def show
    render json: Blog.find(params[:id])
  end
end
