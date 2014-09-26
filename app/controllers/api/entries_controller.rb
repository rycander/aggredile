class Api::EntriesController < ApplicationController
  before_action :require_user!
  
  def show
    @entry = Entry.find(params[:id])
  end

  def index
    @entries = Feed.find(params[:feed_id]).entries
  end

  def user_entries
    @entries = current_user.entries.order('published_at desc')
    render 'index'
  end
end
