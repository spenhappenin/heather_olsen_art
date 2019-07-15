class Api::ArtworksController < ApplicationController
  before_action :set_artwork, only: [:update, :destroy]

  def available_artwork
    render json: Artwork.available_artwork
  end

  def all_artworks
    artwork = Artwork.all.order(date_complete: :desc).page(params[:page]).per(25)
    render json: { artwork: artwork, total_pages: artwork.total_pages }
  end

  def fetch_artworks
    title = current_user ? Artwork.category_title(params[:category]) : params[:category]
    category = Category.where(route: title).first
    render json: category.artworks.order(date_complete: :desc)
  end

  def single_artwork
    artwork = Artwork.find(params[:id])
    artworkCategories = Artwork.get_category_list(artwork)
    render json: { 
      artwork: artwork, 
      artworkCategories: artworkCategories, 
      categories: Category.all 
    }
  end

  def create
    Tinify.key = ENV["TINY_PNG"]
    image_name = params.keys.first
    uploaded_file = params[image_name]
    source = Tinify.from_file(uploaded_file.tempfile)
    source.to_file(image_name)
    begin
      cloud_image = Cloudinary::Uploader.upload(image_name, public_id: params[:title], secure: true)
      artwork = Artwork.create(
        url: cloud_image['secure_url'], 
        title: params['title'], 
        medium: params['medium'], 
        surface: params['surface'], 
        dimensions: params['dimensions'], 
        price: params['price'], 
        status: params['status'], 
        date_complete: params['date_complete']
      )
      Artwork.update_categories(artwork, JSON.parse(params[:artwork_categories]))
      File.delete(image_name) if File.exists?(image_name)
      render json: artwork
    rescue
      render_error(artwork)
    end
  end

  def update 
    if @artwork.update(
      title: params[:title], 
      medium: params[:medium], 
      surface: params[:surface], 
      dimensions: params[:dimensions], 
      price: params[:price], 
      status: params[:status], 
      date_complete: params[:dateComplete], 
      url: params[:url],
    )
      Artwork.update_categories(@artwork, params[:artworkCategories])
      render json: @artwork
    else
      render_error(@artwork)
    end
  end

  def destroy
    Cloudinary::Api.delete_resources([@artwork.title])
    @artwork.destroy
  end

  private 
    def artwork_params
      params.require(:artworks).permit(:title, :url, :type_of, :medium, :surface, :dimensions, :price, :date_complete, :fileData)
    end

    def set_artwork
      @artwork = Artwork.find(params[:id])
    end
end
