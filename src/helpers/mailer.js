
import User from '@/models/userModel';
import * as brevo from '@getbrevo/brevo';

const extractEmail = (emailString) => {
    if (!emailString) return '';
    const match = emailString.match(/<(.+?)>/);
    return match ? match[1] : emailString.trim();
};

export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // Generate a 6 digit OTP for VERIFY and RESET
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: otp, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId,
                { forgotPasswordToken: otp, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        const apiInstance = new brevo.TransactionalEmailsApi();

        apiInstance.setApiKey(
            brevo.TransactionalEmailsApiApiKeys.apiKey,
            process.env.BREVO_API_KEY
        );

        const senderEmail = process.env.EMAIL_FROM ? extractEmail(process.env.EMAIL_FROM) : "support@webai.com";

        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = emailType === "VERIFY" ? "Verify your email" : "Reset your password";

        sendSmtpEmail.htmlContent = `<p>Your OTP code is <b>${otp}</b> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>`;

        sendSmtpEmail.sender = { "name": "WebAI", "email": senderEmail };

        sendSmtpEmail.to = [
            { "email": email, "name": "User" }
        ];

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        return data;

    } catch (error) {
        console.error("Error sending email:", error);
        if (error.response && error.response.body) {
            console.error("Brevo Error Details:", error.response.body);
            throw new Error("Failed to send email: " + JSON.stringify(error.response.body));
        }
        throw new Error(error.message);
    }
}
