class RemoveUrlsFromArtworks < ActiveRecord::Migration[5.1]
  def change
    remove_column :artworks, :url_thumbnail
    remove_column :artworks, :url_mobile
  end
end
