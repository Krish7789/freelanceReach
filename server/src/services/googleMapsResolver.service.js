const axios = require("axios");
const cheerio = require("cheerio");

const BAD_DOMAINS = [
  "facebook.com",
  "instagram.com",
  "yelp.com",
  "hotfrog.com",
  "justdial.com",
  "indiamart.com",
];

function isValidWebsite(url) {
  return (
    url &&
    url.startsWith("http") &&
    !BAD_DOMAINS.some((d) => url.includes(d))
  );
}

exports.findWebsiteFromGoogleMaps = async (name, location) => {
  try {
    const query = encodeURIComponent(`${name} ${location}`);
    const url = `https://www.google.com/maps/search/${query}`;

    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
      timeout: 15000,
    });

    const $ = cheerio.load(data);

    let website = "";

    $("a").each((_, el) => {
      const href = $(el).attr("href");
      if (isValidWebsite(href)) {
        website = href;
        return false;
      }
    });

    return website;
  } catch {
    return "";
  }
};
