class UsersController < ApplicationController
  before_action :require_no_user!

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def guest
    @user = User.new ({
      username: SecureRandom::urlsafe_base64(16),
      password: SecureRandom::urlsafe_base64(16),
      guest: true
    })
    if @user.save
      login!(@user)
      feed = Feed.find_or_create_by_url('http://aggredile.tumblr.com/rss')
      UserFeed.create(user_id: @user.id, feed_id: feed.id)
      redirect_to root_url
    else
      render :new
    end
  end

  def new
    @user = User.new
    render :new
  end

  def user_params
    params.require(:user).permit(:password, :username)
  end
end
