class CreateSeries < ActiveRecord::Migration[5.1]
  def change
    create_table :series do |t|
      t.string :title
      t.date :release_date

      t.timestamps
    end
  end
end
