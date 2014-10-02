class Api::UserFeedsController < ApplicationController
  before_action :require_user!

  def create
    unless (current_user.user_feeds.exists?(params[:feed_id]))
      user_feed = UserFeed.create!(feed_id: params[:feed_id], user_id: current_user.id)
    end
    render json: user_feed
  end

  def destroy
    if (current_user.user_feeds.exists?(params[:id]))
      current_user.user_feeds.find(params[:id]).destroy!
    end
    render json: {}, status: 200
  end
end
