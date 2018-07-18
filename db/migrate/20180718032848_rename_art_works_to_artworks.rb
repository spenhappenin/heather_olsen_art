class RenameArtWorksToArtworks < ActiveRecord::Migration[5.1]
  def change
    rename_table :art_works, :artworks
  end
end
