const { google } = require("googleapis");
const GmailAccount = require("../models/GmailAccount");

/* ---------------- HELPER: TEXT → HTML ---------------- */
const textToHtml = (text) => {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .split("\n\n")
    .map(
      (para) =>
        `<p style="margin:0 0 12px 0; line-height:1.5;">
          ${para.replace(/\n/g, "<br/>")}
        </p>`
    )
    .join("");
};

/* ---------------- SEND EMAIL USING GMAIL ---------------- */
exports.sendGmail = async (req, res) => {
  try {
    const { userId, to, subject, body } = req.body;

    if (!userId || !to || !subject || !body) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const account = await GmailAccount.findOne({ userId });
    if (!account) {
      return res.status(400).json({ message: "Gmail not connected" });
    }

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: account.accessToken,
      refresh_token: account.refreshToken,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // 🔥 Convert text → HTML (FIXES SPACING ISSUE)
    const htmlBody = textToHtml(body);

    const messageParts = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=UTF-8",
      "",
      htmlBody,
    ];

    const message = messageParts.join("\n");

    const encodedMessage = Buffer.from(message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage,
      },
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Gmail send error:", err);
    res.status(500).json({ message: "Email sending failed" });
  }
};

/* ---------------- CHECK GMAIL CONNECTION STATUS ---------------- */
exports.getGmailStatus = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ connected: false });
    }

    const account = await GmailAccount.findOne({ userId });

    res.json({
      connected: Boolean(account),
    });
  } catch (err) {
    console.error("Get Gmail status error:", err);
    res.status(500).json({ connected: false });
  }
};

/* ---------------- DISCONNECT GMAIL ---------------- */
exports.disconnectGmail = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    await GmailAccount.deleteOne({ userId });

    res.json({
      message: "Gmail disconnected successfully",
    });
  } catch (err) {
    console.error("Disconnect Gmail error:", err);
    res.status(500).json({
      message: "Failed to disconnect Gmail",
    });
  }
};
