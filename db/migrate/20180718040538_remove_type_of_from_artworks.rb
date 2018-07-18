class RemoveTypeOfFromArtworks < ActiveRecord::Migration[5.1]
  def change
    remove_column :artworks, :type_of
  end
end
