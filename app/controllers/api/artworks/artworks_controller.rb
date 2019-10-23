class Api::Artworks::ArtworksController < ApplicationController
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
end
