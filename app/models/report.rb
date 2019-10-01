class Report < ApplicationRecord
  validates_presence_of :title
  validates_uniqueness_of :title
  validates :title, length: { minimum: 3, maximum: 10 }

  attr_accessor :file

  after_save :save_file, if: :file

  def save_file
    filename = file.original_filename
    folder = "public/reports/#{id}/file"

    FileUtils.mkdir_p folder
    f = File.open File.join(folder, filename), 'wb'
    f.write file.read
    f.close
    fileData = { original_filename: filename,
                 mime_type: file.content_type,
                 size: file.size }
    self.file = nil
    update filename: filename
    update payload: fileData
  end
end
