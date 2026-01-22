const router = require("express").Router();
const { getBusinesses } = require("../controllers/business.controller");

router.get("/", getBusinesses);

module.exports = router;