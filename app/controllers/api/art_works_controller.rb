class Api::ArtWorksController < ApplicationController

  def fetch_comissions    
    render json: ArtWork.where(type_of: 'comission').order('created_at DESC')
  end

  def fetch_paintings
    render json: ArtWork.where(type_of: 'painting' ).order('created_at DESC')
  end

  def fetch_drawings
    render json: ArtWork.where(type_of: 'drawing').order('created_at DESC')
  end

  def create
    uploaded_image_name = params.keys.first
    uploaded_file = params[uploaded_image_name]

    begin
      cloud_image = Cloudinary::Uploader.upload(uploaded_file, public_id: params[:title])
      art_work = ArtWork.create(url: cloud_image['url'], title: params['title'], type_of: params['type_of'], medium: params['medium'], surface: params['surface'], dimensions: params['dimensions'], price: params['price'], date_complete: params['date_complete'])
      render json: art_work
    rescue
      # TODO: Generate an error 
      puts 'Some error...'
    end
  end

  def destroy
    @art_work = ArtWork.find(params[:id])
    Cloudinary::Api.delete_resources([@art_work.title])
    @art_work.destroy
  end

  private 
    def art_work_params
      params.require(:art_works).permit(:title, :url, :type_of, :medium, :surface, :dimensions, :price, :date_complete)
    end

end