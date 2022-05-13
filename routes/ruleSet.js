const express = require("express");
const router = express.Router();
const {
  createRuleSet,
  getRuleSets,
  deleteRuleSet,
} = require("../controllers/ruleSet");

router.post("/", createRuleSet);

router.get("/", getRuleSets);

router.delete("/:id", deleteRuleSet);

module.exports = router;
