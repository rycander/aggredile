class Api::FeedsController < ApplicationController
  def index
    render json: Feed.all
  end

  def show
    render json: Feed.find(params[:id])
  end

  def create
    f = Feedzilla::Feed.fetch_and_parse(feed_params)
    feed = Feed.find_or_create_by_url(feed_params)
    if feed
      render json: feed
    else
      render json: {error: 'invalid url'}
    end
  end

  def feed_params
    params.require(:feed).permit(:url)
  end
end

