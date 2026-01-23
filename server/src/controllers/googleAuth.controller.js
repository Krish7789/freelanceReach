const { google } = require("googleapis");
const GmailAccount = require("../models/GmailAccount");

// ✅ Hardcode redirect URI for now (safe for debugging)
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
);

/**
 * Start Google OAuth
 */
exports.googleAuth = (req, res) => {
  const { state } = req.query; // userId

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
   scope: [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly"
],

    state,
  });

  res.redirect(url);
};

/**
 * OAuth Callback
 */
exports.googleCallback = async (req, res) => {
  const { code, state: userId } = req.query;

  if (!code || !userId) {
    return res.status(400).send("Missing OAuth parameters");
  }

  try {
    // 🔁 Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // 📬 Fetch Gmail profile to get email
    const gmail = google.gmail({
      version: "v1",
      auth: oauth2Client,
    });

    const profile = await gmail.users.getProfile({ userId: "me" });
    const email = profile.data.emailAddress;

    // 💾 Save Gmail account
    await GmailAccount.findOneAndUpdate(
      { userId },
      {
        userId,
        email,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      },
      { upsert: true, new: true }
    );

    // 🔁 Redirect back to frontend
    res.redirect("https://freelancereach.vercel.app/send-emails?gmail=connected");
  } catch (err) {
    console.error("Google OAuth Error:", err);
    res.status(500).send("Google authentication failed");
  }
};
