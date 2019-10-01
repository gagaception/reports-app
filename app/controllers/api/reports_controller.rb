class Api::ReportsController < ApplicationController
  respond_to :json

  def index
    respond_with Report.all
  end

  def show
    respond_with Report.find(params[:id])
  end

  def create
    report = Report.new(report_params)
    if report.save
      respond_with :api, report
    else
      respond_with report.errors
    end
  end

  def update
    report = Report.find(params['id'])
    report.update(report_params)
    respond_with Report, json: report
  end

  private

  def report_params
    params.require(:report).permit(
      :title, :description, :filename, :payload
    )
  end
end