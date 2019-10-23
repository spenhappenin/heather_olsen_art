class Api::Artworks::AllArtworksController < ApplicationController
  def index
    artwork = Artwork.all.order(date_complete: :desc).page(params[:page]).per(25)
    render json: { artwork: artwork, total_pages: artwork.total_pages }
  end
end
