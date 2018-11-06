class CreateVideos < ActiveRecord::Migration[5.1]
  def change
    create_table :videos do |t|
      t.string :title
      t.text :body
      t.text :url

      t.timestamps
    end
  end
end
