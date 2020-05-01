
class ChargesMailer < ApplicationMailer
  include SendGrid

  def invoice
    @email = params[:email]
    @full_name = params[:full_name]
    @charge  = params[:data][:charge]
    @cart = params[:data][:cart]
    @formatted_cart = params[:formatted_cart]
    @amount = params[:data][:amount]
    @formatted_amount = params[:data][:formatted_amount]
    @shipping_details = params[:data][:shipping_details][:address]
    @billing_details = @charge.billing_details.address
    @pickup = params[:data][:pickup]
    @order = params[:data][:order]

    # from = SendGrid::Email.new(email: "heatherolsenart@gmail.com")
    # to = SendGrid::Email.new(email: "spencer.richards7@gmail.com")
    # subject = "Heather Olsen Art Purchase Confirmation"
    # content = SendGrid::Content.new(type: 'text/plain', value: "Here is the email confirmation")
    # mail = SendGrid::Mail.new(from, subject, to, content)

    # sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
    # response = sg.client.mail._('send').post(request_body: mail.to_json)

    # mail(to: @email, subject: "Heather Olsen Art Purchase Confirmation")
    mail(to: "spencer.richards7@gmail.com", subject: "Heather Olsen Art Purchase Confirmation")
  end
end
