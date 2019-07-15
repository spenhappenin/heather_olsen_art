class Api::UsersController < ApplicationController

  def fetch_user
    render json: User.first
  end

  def user_bio_statement
    user = User.find(1)
    if params.keys.first === "undefined" 
      user.update(
        artist_statement: params[:artist_statement],
        bio: params[:bio], 
      )
    else
      uploaded_image_name = params.keys.first
      uploaded_file = params[uploaded_image_name]
      begin
        cloud_image = Cloudinary::Uploader.upload(uploaded_file, public_id: uploaded_file.original_filename, secure: true)
        user.update(
          artist_statement: params[:artist_statement],
          bio: params[:bio], 
          image: cloud_image['secure_url']
        )
        render json: user
      rescue
        render_error(user)
      end
    end
  end
  
end
