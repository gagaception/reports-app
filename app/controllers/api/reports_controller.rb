class Api::ReportsController < ApplicationController
  respond_to :json

  def index
    respond_with Report.all
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
      respond_with report.errors
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
end