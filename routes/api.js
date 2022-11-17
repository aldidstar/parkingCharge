var express = require("express");
var router = express.Router();
const apiTransaction = require("../controllers/apiTransaction");

// API Transaction
router.get("/transaction", apiTransaction.transactionRead);
router.post("/transaction", apiTransaction.transactionCreate);
router.get("/transaction/search", apiTransaction.transactionSearch);

module.exports = router;
