class AddImageSizesToArtworks < ActiveRecord::Migration[5.1]
  def change
    add_column :artworks, :url_thumbnail, :text
    add_column :artworks, :url_mobile, :text
  end
end
