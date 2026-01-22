const axios = require("axios");
const cheerio = require("cheerio");

const { resolveWebsite } = require("./websiteResolver.service");
const { extractEmailsFromWebsite } = require("./emailExtractor");
const { findWebsiteFromDuckDuckGo } = require("./freeWebsiteResolver.service");

const {
  findWebsiteFromGoogleMaps,
} = require("./googleMapsResolver.service");

const {
  searchPlaces,
  getPlaceDetails,
} = require("./googlePlaces.service");



/* ------------------- SCRAPE COMPANY PAGE (HOTFROG) ------------------- */
async function scrapeCompanyPage(companyUrl) {
  try {
    const { data } = await axios.get(companyUrl, {
      timeout: 10000,
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const $ = cheerio.load(data);

    let website = "";
    let contactPage = "";

    /* ---------- STEP 1: Prefer explicit Website links ---------- */
    $("a").each((_, el) => {
      const text = $(el).text().toLowerCase();
      const href = $(el).attr("href");

      if (
        href &&
        href.startsWith("http") &&
        !href.includes("hotfrog.") &&
        (text.includes("website") ||
          text.includes("official") ||
          text.includes("visit website"))
      ) {
        website = href;
        return false;
      }
    });

    /* ---------- STEP 2: Safe fallback (NO directory mirrors) ---------- */
    if (!website) {
      $("a[href^='http']").each((_, el) => {
        const href = $(el).attr("href");

        if (
          href &&
          !href.includes("hotfrog.") &&
          !href.includes("google.") &&
          !href.includes("facebook.") &&
          !href.includes("linkedin.") &&
          !href.includes("youtube.")
        ) {
          website = href;
          return false;
        }
      });
    }

    /* ---------- Find contact page on REAL website ---------- */
    if (website) {
      try {
        const { data: siteHtml } = await axios.get(website, {
          timeout: 8000,
          headers: { "User-Agent": "Mozilla/5.0" },
        });

        const $$ = cheerio.load(siteHtml);

        $$("a").each((_, el) => {
          const text = $$(el).text().toLowerCase();
          const href = $$(el).attr("href");

          if (text.includes("contact") && href) {
            contactPage = href.startsWith("http")
              ? href
              : website.replace(/\/$/, "") + "/" + href.replace(/^\//, "");
            return false;
          }
        });
      } catch {}
    }

    let emails = [];
    if (website) {
      emails = await extractEmailsFromWebsite(website);
    }

    return { website, contactPage, emails };
  } catch {
    return { website: "", contactPage: "", emails: [] };
  }
}

/* ------------------- SCRAPE HOTFROG SEARCH ------------------- */
exports.scrapeHotfrog = async (keyword, location) => {

const results = [];

for (let i = 0; i < Math.min(places.length, 10); i++) {
  const place = places[i];
  const details = await getPlaceDetails(place.place_id);

  results.push({
    name: details.name,
    website: details.website || "",
    phone: details.formatted_phone_number || "",
    emails: details.website
      ? await extractEmailsFromWebsite(details.website)
      : [],
  });
}


  /* -------- PROCESS EACH BUSINESS (LIMITED & POLITE) -------- */
  for (let i = 0; i < Math.min(results.length, 10); i++) {
    const biz = results[i];



let website = await resolveWebsite(biz.name, location);

if (!website) {
  website = await findWebsiteFromDuckDuckGo(biz.name, location);
}



console.log("FINAL WEBSITE:", {
  name: biz.name,
  website,
});



    // ⏳ polite delay
    await new Promise((r) => setTimeout(r, 1200));

    let emails = [];
    let contactPage = "";

    if (website) {
      // 📧 Extract emails using centralized extractor
      emails = await extractEmailsFromWebsite(website);

      // 🔗 Detect contact page
      try {
        const { data: siteHtml } = await axios.get(website, {
          timeout: 8000,
          headers: { "User-Agent": "Mozilla/5.0" },
        });

        const $$ = cheerio.load(siteHtml);

        $$("a").each((_, el) => {
          const text = $$(el).text().toLowerCase();
          const href = $$(el).attr("href");

          if (text.includes("contact") && href) {
            contactPage = href.startsWith("http")
              ? href
              : website.replace(/\/$/, "") + "/" + href.replace(/^\//, "");
            return false;
          }
        });
      } catch {}
    }

    /* ---------- FINAL BUSINESS OBJECT ---------- */
    biz.website = website || "";
    biz.contactPage = contactPage;
    biz.emails = emails;

    if (emails.length > 0) {
      biz.contactMethod = "email";
      biz.contactValue = emails[0];
    } else if (contactPage) {
      biz.contactMethod = "contact-form";
      biz.contactValue = contactPage;
    } else if (website) {
      biz.contactMethod = "website";
      biz.contactValue = website;
    } else if (biz.phone) {
      biz.contactMethod = "phone";
      biz.contactValue = biz.phone;
    } else {
      biz.contactMethod = "unknown";
      biz.contactValue = "";
    }
    console.log({
  name: biz.name,
  website: biz.website,
  emails: biz.emails,
  contactMethod: biz.contactMethod,
  contactValue: biz.contactValue
});

  }

  return results;
};
