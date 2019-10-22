module AdminCheck
  extend ActiveSupport::Concern

  included do
    before_action :admin_check
  end

  private
    def admin_check
      if current_user
        if current_user.admin != true
          render json: { error: "Not Authorized" }, status: 422
        end
      else
        render json: { error: "Not Authorized" }, status: 422
      end
    end
end
