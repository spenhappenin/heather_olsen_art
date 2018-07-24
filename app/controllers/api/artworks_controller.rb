class Api::ArtworksController < ApplicationController
  before_action :set_artwork, only: [:update, :destroy]

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
    uploaded_image_name = params.keys.first
    uploaded_file = params[uploaded_image_name]
    begin
      cloud_image = Cloudinary::Uploader.upload(uploaded_file, public_id: params[:title], secure: true)
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
      render json: artwork
    rescue
      # TODO: Generate an error 
      puts 'Error!'
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
      url_thumbnail: params[:url_thumbnail],
      url_mobile: params[:url_mobile]
    )
      Artwork.update_categories(@artwork, params[:artworkCategories])
      render json: @artwork
    else
      # TODO: Generate an error 
      puts 'Error!'
    end
  end

  def destroy
    # deletes record from Cloudinary
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
