class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user

  private
  def logout!(user)
    if current_user.guest
      current_user.delete
    else
      current_user.reset_session_token!
    end
    @current_user = nil
    session[:session_token] = nil
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!

  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def require_user!
    redirect_to new_session_url unless current_user
  end

  def require_no_user!
    redirect_to root_url if current_user
  end
end
