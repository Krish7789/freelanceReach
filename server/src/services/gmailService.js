const { google } = require("googleapis");
const GmailAccount = require("../models/GmailAccount");

const sendGmail = async ({ userId, to, subject, body }) => {
  // 1. Get user's Gmail OAuth tokens
  const account = await GmailAccount.findOne({ userId });
  if (!account) throw new Error("Gmail not connected");

  // 2. Create OAuth client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  oauth2Client.setCredentials({
    access_token: account.accessToken,
    refresh_token: account.refreshToken,
  });

  // 3. Create Gmail client
  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });

  // 4. Create raw email
  const message = [
    `From: ${account.email}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    body,
  ].join("\n");

  const encodedMessage = Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // 5. Send email
  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: encodedMessage,
    },
  });
};

module.exports = { sendGmail };
