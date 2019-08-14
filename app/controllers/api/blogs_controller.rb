class Api::BlogsController < ApplicationController
  before_action :set_blog, only: [:show, :update, :destroy]

  def index
    render json: Blog.all
  end

  def show
    render json: @blog
  end

  def create
    Tinify.key = ENV["TINY_PNG"]
    image_name = params.keys.first
    uploaded_file = params[image_name]
    source = Tinify.from_file(uploaded_file.tempfile)
    source.to_file(image_name)
    begin
      cloud_image = Cloudinary::Uploader.upload(image_name, public_id: params[:title], secure: true)
      blog = Blog.create(
        title: params[:title],
        body: params[:body],
        image: cloud_image["secure_url"]
      )
      File.delete(image_name) if File.exists?(image_name)
      render json: blog
    rescue
      render_error(blog)
    end
  end

  def update
    if @blog.update(
      title: params[:title], 
      body: params[:body],
      image: params[:image]
    )
      render json: @body
    else
      render_error(@body)
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
