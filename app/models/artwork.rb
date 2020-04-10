class Artwork < ApplicationRecord
  validates_presence_of :title
  validates_uniqueness_of :title
  validates_inclusion_of :status, :in => ["for sale", "available", "nfs", "sold"]

  has_many :artwork_categories, dependent: :destroy
  has_many :categories, :through => :artwork_categories, dependent: :destroy

  def self.available_artwork
    find_by_sql(["
      SELECT a.* 
      FROM artworks as a
      WHERE a.status = 'available'
    "])
  end

  def self.category_title(title)
    new_title = title.split('-').drop(1)
    new_title = new_title.join('-')
  end

  def self.get_category_list(artwork)
    category_array = []
    artwork.artwork_categories.each do |ac|
      c = Category.find(ac[:category_id])
      category_array << c.id
    end
    return category_array
  end

  def self.update_categories(artwork, categories)
    artwork_categories = artwork.artwork_categories
    categories.each do |c|
      ArtworkCategory.find_or_create_by(category_id: c, artwork_id: artwork[:id])
    end

    artwork_categories.each do |ac|
      unless categories.include?(ac[:category_id])
        ac.destroy
      end
    end
  end

  def self.upload_image(params)
    Tinify.key = ENV["TINY_PNG"]
    image_name = params.keys.first
    uploaded_file = params[image_name]
    source = Tinify.from_file(uploaded_file.tempfile)
    source.to_file(image_name)
    begin
      cloud_image = Cloudinary::Uploader.upload(image_name, public_id: params[:title], secure: true)
      artwork = Artwork.create(
        url: cloud_image['secure_url'], 
        title: params['title'], 
        medium: params['medium'], 
        surface: params['surface'], 
        dimensions: params['dimensions'], 
        price: params['price'], 
        status: params['status'], 
        date_complete: params['date_complete']
      )
      Artwork.update_categories(artwork, JSON.parse(params[:artwork_categories]))
      File.delete(image_name) if File.exists?(image_name)
      artwork
    rescue
      artwork      
    end
  end

end
