class Api::ArtWorksController < ApplicationController
  before_action :set_art_work, only: [:update, :destroy]

  def all_artworks
    render json: ArtWork.all.order(date_complete: :desc)
  end

  def fetch_art_works
    title = current_user ? ArtWork.category_title(params[:category]) : params[:category]
    category = Category.where(route: title).first
    render json: category.art_works.order(date_complete: :desc)
  end

  def single_artwork
    artwork = ArtWork.find(params[:id])
    artworkCategories = ArtWork.get_category_list(artwork)
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
      art_work = ArtWork.create(
        url: cloud_image['secure_url'], 
        title: params['title'], 
        medium: params['medium'], 
        surface: params['surface'], 
        dimensions: params['dimensions'], 
        price: params['price'], 
        status: params['status'], 
        date_complete: params['date_complete']
        )
      ArtWork.update_categories(art_work, JSON.parse(params[:artwork_categories]))
      render json: art_work
    rescue
      # TODO: Generate an error 
      puts 'Error!'
    end
  end

  def update 
    if @art_work.update(
      title: params[:title], 
      medium: params[:medium], 
      surface: params[:surface], 
      dimensions: params[:dimensions], 
      price: params[:price], 
      status: params[:status], 
      date_complete: params[:dateComplete], 
      url: params[:url]
    )
      ArtWork.update_categories(@art_work, params[:artworkCategories])
      render json: @art_work
    else
      # TODO: Generate an error 
      puts 'Error!'
    end
  end

  def destroy
    # deletes record from Cloudinary
    Cloudinary::Api.delete_resources([@art_work.title])
    @art_work.destroy
  end

  private 
    def art_work_params
      params.require(:art_works).permit(:title, :url, :type_of, :medium, :surface, :dimensions, :price, :date_complete, :fileData)
    end

    def set_art_work
      @art_work = ArtWork.find(params[:id])
    end
end
