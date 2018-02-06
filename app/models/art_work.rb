class ArtWork < ApplicationRecord
  validates_presence_of :title
  validates_uniqueness_of :title
  validates_inclusion_of :type_of, :in => %w( painting drawing comission )
  validates_inclusion_of :status, :in => ["for sale", "nfs", "sold"]
end
