class ChangeForeignKeyForArtworkCategories < ActiveRecord::Migration[5.1]
  def change
    rename_column :artwork_categories, :art_work_id, :artwork_id
  end
end
