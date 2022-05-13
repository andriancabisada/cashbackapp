const mongoose = require("mongoose");

const cashBackSchema = new mongoose.Schema({
  transactionId: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CashBack", cashBackSchema);
