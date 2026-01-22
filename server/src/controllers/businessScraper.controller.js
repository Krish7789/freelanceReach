


const { extractEmailsFromWebsite } = require("../services/emailExtractor");
const scrapeCooldown = new Map();




exports.scrapeAndSaveBusinesses = async (req, res) => {
  console.log("🔥 SCRAPE ROUTE HIT");

  try {
 const userId = req.user.id;
const now = Date.now();
const lastScrape = scrapeCooldown.get(userId) || 0;

if (now - lastScrape < 2 * 60 * 1000) {
  return res.json({
    message: "Please wait 2 minutes before searching again (free mode).",
    businesses: [],
    count: 0,
  });
}

scrapeCooldown.set(userId, now);


    const { keyword, location } = req.query;
    console.log("📌 INPUT:", keyword, location);

    console.log("➡️ CALLING RestaurantGuru list");
    const profiles = await getRestaurantGuruProfiles(location);
    console.log("✅ PROFILES RECEIVED:", profiles.length);

    const businesses = [];

   for (const profileUrl of profiles) {
  await new Promise(r => setTimeout(r, 1500)); // <-- ADD THIS


      const website = await extractWebsiteFromRestaurantGuru(profileUrl);
      console.log("🌐 WEBSITE:", website);

      if (!website) continue;

      const emails = await extractEmailsFromWebsite(website);
      console.log("📧 EMAILS:", emails);

      businesses.push({
        name: website.replace(/^https?:\/\//, "").split("/")[0],
        website,
        emails,
        contactMethod: emails.length ? "email" : "website",
        contactValue: emails[0] || website,
        description: "Extracted from RestaurantGuru",
        location: { city: location, country: "Unknown" },
        category: keyword,
      });
    }
  if (profiles.length === 0) {
  return res.json({
    message: "Free mode active — some sources temporarily unavailable.",
    businesses: [
      {
        name: `${keyword} in ${location}`,
        website: "",
        emails: [],
        contactMethod: "manual",
        contactValue: "",
        description: "Live sources temporarily unavailable",
        location: { city: location, country: "Unknown" },
        category: keyword,
      },
    ],
    count: 1,
  });
}



    console.log("🚀 SENDING RESPONSE");

    return res.json({
      message: "Scraping completed",
      businesses,
      count: businesses.length,
    });
  } catch (err) {
    console.error("❌ CONTROLLER ERROR:", err);
    return res.status(500).json({ businesses: [], count: 0 });
  }
};



/**
 * FETCH SAVED BUSINESSES
 */
exports.getSavedBusinesses = async (req, res) => {
  try {
    const userId = req.user.id;

    const businesses = await Business.find({ userId }).sort({
      createdAt: -1,
    });

    res.json({
      count: businesses.length,
      businesses,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch businesses" });
  }
};
