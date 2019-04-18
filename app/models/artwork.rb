class Artwork < ApplicationRecord
  validates_presence_of :title
  validates_uniqueness_of :title
  validates_inclusion_of :status, :in => ["for sale", "nfs", "sold"]

  has_many :artwork_categories, dependent: :destroy
  has_many :categories, :through => :artwork_categories, dependent: :destroy

  def self.category_title(title)
    new_title = title.split('-').drop(1)
    new_title = new_title.join('-')
  end

  def self.available_artwork
    find_by_sql(["
      SELECT a.* 
      FROM artworks as a
      WHERE a.status = 'for sale'
    "])
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

  def self.get_category_list(artwork)
    category_array = []
    artwork.artwork_categories.each do |ac|
      c = Category.find(ac[:category_id])
      category_array << c.id
    end
    return category_array
  end
end
