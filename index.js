const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");

const connectDB = require("./database/config");
const app = express();

const cashBackRoutes = require("./routes/cashBack");
const transactionRoutes = require("./routes/transaction");
const ruleSetRoutes = require("./routes/ruleSet");

// log requests
app.use(morgan("tiny"));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//middleware
app.use(express.json());
app.use("/cashback", cashBackRoutes);
app.use("/transaction", transactionRoutes);
app.use("/ruleset", ruleSetRoutes);

app.get("/", (req, res) => {
  res.send("Hello Homepage");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
