import { NextResponse } from "next/server";
import * as brevo from '@getbrevo/brevo';

// Initialize Brevo
const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const extractEmail = (emailString) => {
    if (!emailString) return '';
    const match = emailString.match(/<(.+?)>/);
    return match ? match[1] : emailString.trim();
};

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, phone, email: userEmail, remark = "No remarks" } = body;

        if (!name || !phone || !userEmail) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Send Email via Brevo
        const sendSmtpEmail = new brevo.SendSmtpEmail();
        const receiverEmail = process.env.EMAIL_FROM ? extractEmail(process.env.EMAIL_FROM) : "admin@webai.com";

        sendSmtpEmail.subject = `New Print Request`;
        sendSmtpEmail.sender = { "name": "WebAI Print Service", "email": "no-reply@webai.com" };
        sendSmtpEmail.to = [{ "email": receiverEmail, "name": "Admin" }];

        sendSmtpEmail.htmlContent = `
            <h2>New Storybook Print Request</h2>
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Customer Email:</strong> ${userEmail}</p>
            <p><strong>Remark:</strong> ${remark}</p>
        `;

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        return NextResponse.json({ message: "Print request submitted successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Print API Error:", error);
        return NextResponse.json({ message: error.message || "Failed to process print request" }, { status: 500 });
    }
}
