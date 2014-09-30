class Api::EntryVisitsController < ApplicationController
  before_action :require_user!
  
  def create
    
    unless (current_user.entry_visits.exists?(params[:entry_id]))
      entry_visit = EntryVisit.create!(entry_id: params[:entry_id], user_id: current_user.id)
    end
    render json: entry_visit
  end

end
