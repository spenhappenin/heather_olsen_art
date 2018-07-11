class ArtWork < ApplicationRecord
  validates_presence_of :title
  # validates_uniqueness_of :title
  validates_inclusion_of :status, :in => ["for sale", "nfs", "sold"]

  has_many :artwork_categories, dependent: :destroy
  #TODO: may need dependent destory here too??
  has_many :categories, :through => :artwork_categories

  def self.category_title(title)
    new_title = title.split('-').drop(1)
    new_title = new_title.join('-')
  end

  def self.update_categories(artwork, categories)
    artwork_categories = artwork.artwork_categories

    # handles create
    categories.each do |c|
      ArtworkCategory.find_or_create_by(category_id: c[:id], art_work_id: artwork[:id])
    end

    # handles delete 
    category_array = categories.map { |c| c[:id] }
    artwork_categories.each do |ac|
      unless category_array.include?(ac[:category_id])
        ac.destroy
      end
    end
  end
end
