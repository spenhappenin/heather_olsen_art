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
end
