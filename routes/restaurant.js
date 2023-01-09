const express = require("express");
const router = express.Router();
var database = require("./../database");

router.get("/", async (req, res) => {
  let orders = await database.getOrders();
  //   console.log(orders[0]["address"]);
  res.render("ordersDisplay", {
    orders: orders,
  });
});

router.get("/complete", (req, res) => {
  database.completeOrder(req.query.id);
});

module.exports = router;
