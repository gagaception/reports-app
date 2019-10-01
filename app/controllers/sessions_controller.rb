class SessionsController < ApplicationController
  include CurrentUserConcern

  def create
    user = User.find_by(email: params['user']['email'])
               .try(:authenticate, params['user']['password'])
    if user
      session[:user_id] = user.id
      render json: { status: :created, logged_in: true, user: user }
    else
      render json: { status: 401, logged_in: false, msg: "Wrong email or password" }
    end
  end

  def login
    if @current_user
      render json: { logged_in: true, user: @current_user }
    else
      render json: { logged_in: false }
    end
  end

  def logout
    reset_session
    render json: { logged_out: true, status: 200}
  end
end