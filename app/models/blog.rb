class Blog < ApplicationRecord

  def self.all_blogs
    Blog.order(updated_at: :desc)
  end

  def self.upload_image(params)
    Tinify.key = ENV["TINY_PNG"]
    image_name = params.keys.first
    uploaded_file = params[image_name]
    source = Tinify.from_file(uploaded_file.tempfile)
    source.to_file(image_name)
    begin
      cloud_image = Cloudinary::Uploader.upload(image_name, public_id: params[:title], secure: true)
      blog = Blog.create(
        title: params[:title],
        body: params[:body],
        image: cloud_image["secure_url"]
      )
      File.delete(image_name) if File.exists?(image_name)
      blog
    rescue
      render_error(blog)
    end
  end
end
