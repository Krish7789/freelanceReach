const { google } = require("googleapis");
const GmailAccount = require("../models/GmailAccount");

/**
 * Create OAuth client (PER REQUEST)
 */
const createOAuthClient = () =>
  new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

/**
 * START GOOGLE OAUTH
 */
exports.googleAuth = (req, res) => {
  const { state } = req.query; // userId

  if (!state) {
    return res.status(400).send("Missing userId");
  }

  const oauth2Client = createOAuthClient();

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // force refresh_token
    include_granted_scopes: true,
    scope: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/gmail.readonly",
    ],
    state,
  });

  res.redirect(url);
};

/**
 * GOOGLE OAUTH CALLBACK
 */
exports.googleCallback = async (req, res) => {
  const { code, state: userId } = req.query;

  if (!code || !userId) {
    return res.status(400).send("Missing OAuth parameters");
  }

  try {
    const oauth2Client = createOAuthClient();

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Fetch Gmail profile
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });
    const profile = await gmail.users.getProfile({ userId: "me" });

    const email = profile.data.emailAddress;

    // Preserve old refresh token if Google didn’t send one
    const existing = await GmailAccount.findOne({ userId });

    await GmailAccount.findOneAndUpdate(
      { userId },
      {
        userId,
        email,
        accessToken: tokens.access_token,
        refreshToken:
          tokens.refresh_token || existing?.refreshToken,
      },
      { upsert: true, new: true }
    );

    // Redirect to frontend
    res.redirect(
      "https://freelancereach.vercel.app/send-emails?gmail=connected"
    );
  } catch (err) {
    console.error("Google OAuth Error:", err);
    res.redirect(
      "https://freelancereach.vercel.app/send-emails?gmail=error"
    );
  }
};
