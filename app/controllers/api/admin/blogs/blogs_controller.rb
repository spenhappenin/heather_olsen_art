class Api::Admin::Blogs::BlogsController < ApplicationController
  include AdminCheck
  before_action :set_blog, only: [:update, :destroy]

  def create
    if params.keys.first != "undefined"
      render json: Blog.upload_image(params)
    else
      blog = Blog.create(title: params[:title], body: params[:body])
      render json: blog
    end
  end

  def update
    if @blog.update(blog_params)
      render json: @blog
    else
      render_error(@blog)
    end
  end

  def destroy
    @blog.destroy
  end

  private
    def blog_params
      params.require(:blog).permit(:title, :body, :image)
    end

    def set_blog
      @blog = Blog.find(params[:id])
    end
end
