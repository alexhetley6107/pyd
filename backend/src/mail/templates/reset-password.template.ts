export const resetPasswordTemplate = (resetLink: string) => `
    <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Reset Password</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #eef0f2; font-family: Arial, sans-serif;">

            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eef0f2; padding: 40px 0;">
            <tr>
                <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    
                    <!-- Header -->
                    <tr>
                    <td style="background-color: #143447; padding: 20px;" align="center">
                      <h1 style="color: #ffffff; font-size: 24px; margin: 0;">PYD</h1>
                    </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                    <td style="padding: 30px;">
                        <h2 style="color: #143447; font-size: 20px; margin-top: 0;">Password Reset Request</h2>
                        <p style="color: #555; font-size: 16px; line-height: 1.5;">
                        We received a request to reset your password. If you made this request, please click the button below to reset your password.
                        </p>

                        <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" style="background-color: #ff0763; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px;">
                            Reset Password
                        </a>
                        </div>

                        <p style="color: #999; font-size: 14px;">
                        If you did not request a password reset, please ignore this email.
                        </p>
                    </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                    <td style="background-color: #eef0f2; text-align: center; padding: 20px; color: #777; font-size: 13px;">
                        &copy; 2025 PYD Company. All rights reserved.
                    </td>
                    </tr>

                </table>
                </td>
            </tr>
            </table>

        </body>
    </html>
`;
