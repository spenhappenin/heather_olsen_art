class ChangePriceToBeIntegerInArtworks < ActiveRecord::Migration[5.1]
  def change
    change_column :artworks, :price, :integer
  end
end
