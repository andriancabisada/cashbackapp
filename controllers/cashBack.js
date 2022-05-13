const ruleSetDb = require("../models/ruleSet");
const transactionDb = require("../models/transaction");
const cashBackDb = require("../models/cashBack");

const getCashBack = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content cannot be empty" });
  }
  const ruleSets = await ruleSetDb.find();
  const transactions = await transactionDb.find();
  let cashback = [];

  console.log(transactions.length);
  if (ruleSets.length > 0 && transactions.length > 0) {
    for (let i = 0; i < ruleSets.length; i++) {
      for (let j = 0; j < transactions.length; j++) {
        //console.log(transactions[j].date);
        //console.log(ruleSets[i].amount);
        console.log(inDate(ruleSets[i].startDate, transactions[j].date));
        console.log(inDate1(transactions[j].date, ruleSets[i].endDate));
        if (
          ruleSets[i].startDate >= transactions[j].date &&
          transactions[j].date <= ruleSets[i].endDate
        ) {
          cashback = new cashBackDb({
            transactionId: transactions[j].id,
            amount: ruleSets[i].amount,
          });

          await cashback.save(cashback);
        }
      }
    }
    return res.send(cashback);
  }
  return res.send("No data");
};

function inDate(dateString1, dateString2) {
  return dateString1 >= dateString2;
}

function inDate1(dateString1, dateString2) {
  return dateString1 <= dateString2;
}

module.exports = {
  getCashBack,
};
