const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  findBusinessesWithEmailAI,
} = require("../controllers/aiBusiness.controller");

const router = express.Router();

router.post(
  "/businesses-with-email",
  authMiddleware,
  findBusinessesWithEmailAI
);

module.exports = router;
