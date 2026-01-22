const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const businessRoutes = require("./routes/business.routes");
const gmailRoutes = require("./routes/gmail.routes");
const googleAuthRoutes = require("./routes/googleAuth.routes");
const businessScrapeRoutes = require("./routes/businessScrape.routes");
const aiRoutes=require("./routes/ai.routes");
const emailRoutes = require("./routes/email.routes");

const app = express();

app.use(cors({
  origin: ["http://localhost:8080",
    "https://freelancereach.vercel.app"
  ],
  
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/auth", googleAuthRoutes);
app.use("/api/gmail", gmailRoutes);
app.use("/api/business-scrape", businessScrapeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/emails", emailRoutes);
console.log("JWT:", process.env.JWT_SECRET);



module.exports = app;
