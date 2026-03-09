import express from "express";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// API routes
app.post("/api/users/send-welcome-email", async (req, res) => {
  const { username, email, role, parentClientEmail } = req.body;

  console.log(`Attempting to send welcome email to ${email} for user ${username}`);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"DeskNet Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to DeskNet!',
      text: `Hello ${username},\n\nYou have been added to DeskNet as a ${role} by ${parentClientEmail}.\n\nWelcome aboard!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 16px;">
          <h1 style="color: #009688;">Welcome to DeskNet!</h1>
          <p>Hello <strong>${username}</strong>,</p>
          <p>You have been added to DeskNet as a <strong>${role}</strong> by <strong>${parentClientEmail}</strong>.</p>
          <p>We're excited to have you on board. You can now access your portal and start collaborating.</p>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b;">
            Best regards,<br>
            The DeskNet Team
          </div>
        </div>
      `,
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      console.log(`Email successfully sent to ${email}`);
      res.json({ success: true, message: "Welcome email sent successfully." });
    } else {
      console.warn("Email credentials (EMAIL_USER/EMAIL_PASS) not set. Email not sent.");
      res.json({ 
        success: false, 
        message: "Email credentials not configured. Please set EMAIL_USER and EMAIL_PASS in settings.",
        debug: { username, email, role, parentClientEmail }
      });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to send email.",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const startDevServer = async () => {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    
    const PORT = 3000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  };
  startDevServer();
} else if (process.env.VERCEL !== "1") {
  // Local production test
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist/index.html"));
  });
  
  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
