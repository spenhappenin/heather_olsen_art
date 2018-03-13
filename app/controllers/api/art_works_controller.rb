class Api::ArtWorksController < ApplicationController
  before_action :set_art_work, only: [:update, :destroy]

  def fetch_comissions    
    render json: ArtWork.where(type_of: 'comission').order('created_at DESC')
  end

  def fetch_paintings
    # binding.pry
    art_works = ArtWork.where(type_of: 'painting').order('created_at DESC').page(params[:page]).per(25)
    render json: { 
      total_pages: art_works.total_pages,
      art_works: art_works
    }
    # artWorks = ArtWork.where(type_of: 'painting').order('created_at DESC').page()
  end

  def fetch_drawings
    render json: ArtWork.where(type_of: 'drawing').order('created_at DESC')
  end

  def create
    uploaded_image_name = params.keys.first
    uploaded_file = params[uploaded_image_name]

    begin
      cloud_image = Cloudinary::Uploader.upload(uploaded_file, public_id: params[:title], secure: true)
      art_work = ArtWork.create(url: cloud_image['secure_url'], title: params['title'], type_of: params['type_of'], medium: params['medium'], surface: params['surface'], dimensions: params['dimensions'], price: params['price'], status: params['status'], date_complete: params['date_complete'])
      render json: art_work
    rescue
      # TODO: Generate an error 
      puts 'Error!'
    end
  end

  def update 
    if @art_work.update(title: params['title'], type_of: params['type'], medium: params['medium'], surface: params['surface'], dimensions: params['dimensions'], price: params['price'], status: params['status'], date_complete: params['dateComplete'], url: params['url'])
      render json: @art_work
    else
      # TODO: Generate an error 
      puts 'Error!'
    end
  end

  def destroy
    Cloudinary::Api.delete_resources([@art_work.title])
    @art_work.destroy
  end

  private 
    def art_work_params
      params.require(:art_works).permit(:title, :url, :type_of, :medium, :surface, :dimensions, :price, :date_complete)
    end

    def set_art_work
      @art_work = ArtWork.find(params[:id])
    end

end