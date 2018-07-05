class ArtWork < ApplicationRecord
  validates_presence_of :title
  validates_uniqueness_of :title
  validates_inclusion_of :status, :in => ["for sale", "nfs", "sold"]

  has_many :artwork_categories
  has_many :categories, :through => :artwork_categories
end
