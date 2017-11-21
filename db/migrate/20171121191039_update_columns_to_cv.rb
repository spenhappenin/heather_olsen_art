class UpdateColumnsToCv < ActiveRecord::Migration[5.1]
  def change
    remove_column :cvs, :cv_year, :string
    add_column :cvs, :cv_date, :date
    add_column :cvs, :location, :string
  end
end
