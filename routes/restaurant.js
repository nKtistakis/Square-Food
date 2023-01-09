import express from "express";
import { getOrders, completeOrder } from "./../database.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let orders = await getOrders();
  //   console.log(orders[0]["address"]);

  res.render("ordersDisplay", {
    orders: orders,
  });
});

router.get("/complete", (req, res) => {
  completeOrder(req.query.id);
  res.send("ok");
});

export default router;
