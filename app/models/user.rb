class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :omniauthable
  include DeviseTokenAuth::Concerns::User

  def self.upload_image(params, user)
    uploaded_image_name = params.keys.first
      uploaded_file = params[uploaded_image_name]
      begin
        cloud_image = Cloudinary::Uploader.upload(uploaded_file, public_id: uploaded_file.original_filename, secure: true)
        user.update(
          artist_statement: params[:artist_statement],
          bio: params[:bio], 
          image: cloud_image['secure_url']
        )
        user
      rescue
        user
      end
  end
  
end
