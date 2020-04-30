class Order < ApplicationRecord
  has_many :art_orders
  has_many :artworks, through: :art_orders

end
