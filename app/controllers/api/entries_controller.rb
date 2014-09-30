class Api::EntriesController < ApplicationController
  before_action :require_user!
  
  def show
    @entry = Entry.find(params[:id])
  end

  def index
    feed = Feed.find(params[:feed_id])
    @entries = feed.latest_entries
  end

  def user_entries
    current_user.feeds.each do |feed|
      feed.latest_entries
    end
    @entries = current_user.entries.order('published_at  desc')
      .page(params[:page] || 1)
    @entry_visit_hashes = Hash[current_user.entry_visits.pluck(:entry_id, :id)]
    render 'index'
  end
end
