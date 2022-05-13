const ruleSetDb = require("../models/ruleSet");
const { v4: uuidv4 } = require("uuid");

const createRuleSet = async (req, res) => {
  const ruleSet = new ruleSetDb({
    id: uuidv4(),
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    amount: req.body.amount,
  });
  await ruleSet
    .save(ruleSet)
    .then((data) => {
      res.json(ruleSet);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating a create operation",
      });
    });
};

const getRuleSets = async (req, res) => {
  try {
    const rulesets = await ruleSetDb.find();
    res.json(rulesets);
  } catch (error) {
    res.send("Error " + error);
  }
};

const deleteRuleSet = async (req, res) => {
  var id = req.params.id;
  await ruleSetDb
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
  createRuleSet,
  getRuleSets,
  deleteRuleSet,
};
