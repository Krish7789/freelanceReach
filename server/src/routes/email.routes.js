const express = require("express");
const { generateEmail } = require("../controllers/emailGenerate.controller");

const router = express.Router();

router.post("/generate", generateEmail);

module.exports = router;
