class SeriesArtWork < ApplicationRecord
  belongs_to :art_work, optional: true
  belongs_to :series, optional: true
end
