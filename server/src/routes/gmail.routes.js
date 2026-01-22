const express = require("express");
const {
  sendGmail,
  disconnectGmail,
  getGmailStatus,
} = require("../controllers/gmail.controller");

const router = express.Router();

router.post("/send", sendGmail);
router.post("/disconnect", disconnectGmail);
router.get("/status/:userId", getGmailStatus);

module.exports = router;
