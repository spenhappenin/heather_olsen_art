class ArtOrder < ApplicationRecord
  belongs_to :artwork
  belongs_to :order
end
