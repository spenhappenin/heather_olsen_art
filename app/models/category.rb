class Category < ApplicationRecord
  has_many :artwork_categories, dependent: :destroy
  has_many :artworks, :through => :artwork_categories, dependent: :destroy
  acts_as_list

  def self.by_route
    Category.find_by(route: title)
  end
end
