class Api::Admin::Artworks::ArtworksController < ApplicationController
  before_action :set_artwork, only: [:update, :destroy]
  
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

  private 
    def artwork_params
      params.require(:artwork).permit(
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
        :url,
        :shipping_cost
      )
    end

    def set_artwork
      @artwork = Artwork.find(params[:id])
    end
end
