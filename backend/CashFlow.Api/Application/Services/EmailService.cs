using CashFlow.Api.Application.Interfaces;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace CashFlow.Api.Application.Services;

public class EmailService:IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config,ILogger<EmailService> logger)
    {
        _config=config;
        _logger= logger;
    }

    public async Task SendWelcomeEmailAsync(string toEmail,string userName)
    {
        try
        {
            var message=new MimeMessage();

            // from
            message.From.Add(new MailboxAddress(
                 _config["Email:FromName"],
                _config["Email:FromEmail"]
            ));

            // To
            message.To.Add(new MailboxAddress(userName, toEmail));

            // Subject
            message.Subject="Welcome to Cashflow!";

            // Body
            message.Body = new TextPart("html")
            {
                Text= BuildWelcomeEmailBody(userName)
            };
            // send
            using var client= new SmtpClient();
            await client.ConnectAsync(_config["Email:Host"],int.Parse(_config["Email:Port"]!),
            SecureSocketOptions.Auto);

            await client.AuthenticateAsync(_config["Email:Username"],
            _config["Email:Password"]);

            await client.SendAsync(message);
            await client.DisconnectAsync(true);

            _logger.LogInformation("Welcome email sent to {Email}",toEmail);
        }
        catch(Exception ex)
        {
            _logger.LogError(ex,"Failed to send welcome email to {Email}",toEmail);
        }
    }

    private static string BuildWelcomeEmailBody(string userName)
{
    var css = @"
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 0; background: #f8fafc; }
        .container { max-width: 560px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
        .header { background: #2563EB; padding: 40px 40px 32px; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 700; }
        .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px; }
        .body { padding: 40px; }
        .greeting { font-size: 18px; font-weight: 600; color: #111827; margin: 0 0 12px; }
        .text { font-size: 15px; color: #6B7280; line-height: 1.6; margin: 0 0 24px; }
        .features { background: #F0F7FF; border-radius: 12px; padding: 24px; margin: 24px 0; }
        .feature { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
        .feature:last-child { margin-bottom: 0; }
        .feature-dot { width: 8px; height: 8px; background: #2563EB; border-radius: 50%; flex-shrink: 0; }
        .feature-text { font-size: 14px; color: #374151; }
        .button { display: block; background: #2563EB; color: white; text-decoration: none; text-align: center; padding: 14px 32px; border-radius: 10px; font-size: 15px; font-weight: 600; margin: 28px 0 0; }
        .footer { padding: 24px 40px; border-top: 1px solid #F3F4F6; text-align: center; }
        .footer p { font-size: 13px; color: #9CA3AF; margin: 0; }
    ";

    return $@"
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='utf-8'>
            <style>{css}</style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>CashFlow</h1>
                    <p>Smart money management</p>
                </div>
                <div class='body'>
                    <p class='greeting'>Welcome, {userName}! 👋</p>
                    <p class='text'>
                        We're thrilled to have you on board. Your CashFlow account is ready —
                        start taking control of your finances today.
                    </p>
                    <div class='features'>
                        <div class='feature'>
                            <div class='feature-dot'></div>
                            <span class='feature-text'>Track income and expenses in real time</span>
                        </div>
                        <div class='feature'>
                            <div class='feature-dot'></div>
                            <span class='feature-text'>Visualize your spending with smart charts</span>
                        </div>
                        <div class='feature'>
                            <div class='feature-dot'></div>
                            <span class='feature-text'>Manage wallets and transactions easily</span>
                        </div>
                        <div class='feature'>
                            <div class='feature-dot'></div>
                            <span class='feature-text'>Get insights to reach your financial goals</span>
                        </div>
                    </div>
                    <p class='text'>
                        If you have any questions, just reply to this email — we're always happy to help.
                    </p>
                    <a href='http://localhost:5173/login' class='button'>
                        Go to CashFlow →
                    </a>
                </div>
                <div class='footer'>
                    <p>© 2026 CashFlow. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>";
}

}
