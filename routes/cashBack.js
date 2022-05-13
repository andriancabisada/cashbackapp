const express = require("express");
const router = express.Router();
const { getCashBack } = require("../controllers/cashBack");

router.get("/", getCashBack);

module.exports = router;
