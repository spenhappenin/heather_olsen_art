class ChargesMailer < ApplicationMailer
  def invoice  
    @email = params[:email]    
    mail(to: @email, subject: "You just purchased something")
  end

  def order
    binding.pry
  end
end
