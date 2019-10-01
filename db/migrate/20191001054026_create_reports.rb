class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.string :title
      t.text :description
      t.string :filename
      t.json :payload

      t.timestamps
    end
  end
end
