class Api::ArtworksController < ApplicationController
  before_action :set_artwork, only: [:update, :destroy]

  def index
    title = current_user ? Artwork.category_title(params[:category]) : params[:category]
    category = Category.find_by(route: title)
    render json: category.artworks.order(date_complete: :desc)
  end

  def show
    artwork = Artwork.find(params[:id])
    artworkCategories = Artwork.get_category_list(artwork)
    render json: { 
      artwork: artwork, 
      artworkCategories: artworkCategories, 
      categories: Category.all 
    }
  end

  def create
    artwork = Artwork.upload_image(params)
    if artwork
      render json: artwork
    else
      render_error(artwork)
    end
  end

  def update 
    if @artwork.update(artwork_params)
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

  def available_artwork
    render json: Artwork.available_artwork
  end

  def all_artworks
    artwork = Artwork.all.order(date_complete: :desc).page(params[:page]).per(25)
    render json: { artwork: artwork, total_pages: artwork.total_pages }
  end

  private 
    def artwork_params
      params.require(:artworks).permit(
        :date_complete, 
        :dateComplete,
        :dimensions, 
        :fileData, 
        :medium, 
        :price, 
        :status, 
        :surface, 
        :title, 
        :type_of, 
        :url
      )
    end

    def set_artwork
      @artwork = Artwork.find(params[:id])
    end
end
