class Api::FeedsController < ApplicationController
  before_action :require_user!
  
  def index
    @feeds = Feed.all
  end

  def show
    @feed = Feed.find(params[:id])
    @feed.latest_entries
    @entries = @feed.entries
  end

  def create
    feed = Feed.find_or_create_by_url(feed_params[:url])
    feed.latest_entries
    UserFeed.create!(user_id: current_user.id, feed_id: feed.id)
    if feed
      render json: feed
    else
      render json: {error: 'invalid url'}, status: :unprocessable_entity
    end
  end

  def feed_params
    params.require(:feed).permit(:url)
  end
end
