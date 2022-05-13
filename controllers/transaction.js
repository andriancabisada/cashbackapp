const transactionDb = require("../models/transaction");
const { v4: uuidv4 } = require("uuid");

const createTransaction = async (req, res) => {
  const transaction = new transactionDb({
    id: req.body.id,
    date: req.body.date,
  });
  await transaction
    .save(transaction)
    .then((data) => {
      res.json(transaction);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionDb.find();
    res.json(transactions);
  } catch (error) {
    res.send("Error " + error);
  }
};

const deleteTransaction = async (req, res) => {
  var id = req.params.id;
  await transactionDb
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.send({
          message: `Cannot Delete with id ${id}. Maybe something is wrong`,
        });
      } else {
        res.send({ message: "Successfully deleted" });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Could not delete id " + id });
    });
};

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
};
