require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Portfolio Mailer Backend Running ✅");
});

app.post("/send-mail", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.ADMIN_EMAIL}>`,  // always your gmail (safe)
      replyTo: email,                                  // ✅ user email (must be string)
      to: process.env.ADMIN_EMAIL,
      subject: `Portfolio Contact — ${name}`,
      text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    });

    return res.json({ success: true, message: "Sent" });
  } catch (err) {
    console.error("Mail error:", err);
    return res.status(500).json({ success: false, message: "Mail failed" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));