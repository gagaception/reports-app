class Api::ReportsController < ApplicationController
  respond_to :json

  def index
    respond_with Report.mime_type_order
  end

  def show
    respond_with Report.find(params[:id])
  end

  def create
    report = Report.new(  
                          title: params[:title],
                          description: params[:description],
                          file: params[:file]
                        )
    if report.save
      respond_with :api, report
    else
      respond_with :api, report.errors
    end
  end

  def update
    report = Report.find(params['id'])
    report.update(
                  title: params[:title],
                  description: params[:description]
                  )
    respond_with Report, json: report
  end

  def download_file
    report = Report.find(params['report_id'])
    send_file "#{Rails.root}/public/reports/#{report.id}/file/#{report.filename}",  x_sendfile: true
  end
end