class AddStatusToArtWorks < ActiveRecord::Migration[5.1]
  def change
    add_column :art_works, :status, :string
  end
end
