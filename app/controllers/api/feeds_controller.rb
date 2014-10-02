class Api::FeedsController < ApplicationController
  before_action :require_user!
  
  def index
    @feeds = Feed.all
  end

  def show
    @feed = Feed.find(params[:id])
    @feed.latest_entries
    @entries = @feed.entries
    @entry_visit_hashes = Hash[current_user.entry_visits.pluck(:entry_id, :id)]
    user_feed = current_user.user_feeds.where(feed_id: @feed.id).first
    @user_subscribed = user_feed.id if user_feed
  end

  def create
    @feed = Feed.find_or_create_by_url(feed_params[:url])
    if @feed
      @feed.latest_entries
      @entries = @feed.entries
      @entry_visit_hashes = Hash[current_user.entry_visits.pluck(:entry_id, :id)]
      render 'show'
    else
      render json: {error: 'invalid url'}, status: :unprocessable_entity
    end
  end

  def feed_params
    params.require(:feed).permit(:url)
  end
end
