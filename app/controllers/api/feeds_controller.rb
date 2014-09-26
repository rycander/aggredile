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
    feed = Feed.find_or_create_by_url(feed_params)
    feed.latest_entries;
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
