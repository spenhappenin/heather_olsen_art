class AddPublishedToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :published, :boolean, default: false
  end
end
