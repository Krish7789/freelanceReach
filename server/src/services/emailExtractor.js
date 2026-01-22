const axios = require("axios");

const EMAIL_REGEX =
  /(mailto:)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

/* ---------- extract emails from raw html ---------- */
function extractEmailsFromText(text) {
  const emails = new Set();
  let match;

  while ((match = EMAIL_REGEX.exec(text)) !== null) {
    emails.add(match[2]); // group without "mailto:"
  }

  return [...emails];
}

/* ---------- scrape multiple pages ---------- */
exports.extractEmailsFromWebsite = async (websiteUrl) => {
  const base = websiteUrl.replace(/\/$/, "");
  const pagesToTry = [
    base,
    `${base}/contact`,
    `${base}/contact-us`,
    `${base}/about`,
    `${base}/support`,
  ];

  const foundEmails = new Set();

  for (const url of pagesToTry) {
    try {
      const { data } = await axios.get(url, {
        timeout: 8000,
        headers: { "User-Agent": "Mozilla/5.0" },
      });

      extractEmailsFromText(data).forEach((e) =>
        foundEmails.add(e)
      );

      // early exit if email found
      if (foundEmails.size > 0) break;
    } catch {
      continue;
    }
  }

  return [...foundEmails];
};
