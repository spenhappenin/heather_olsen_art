class Api::Artworks::AvailableArtworksController < ApplicationController
  def index
    render json: Artwork.available_artwork
  end
end
