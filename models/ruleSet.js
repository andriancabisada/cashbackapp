const mongoose = require("mongoose");

const ruleSetSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("RuleSet", ruleSetSchema);
