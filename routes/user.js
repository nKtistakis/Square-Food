import express from "express";
import { getMenu, addOrder } from "./../database.js";
import convertCurrency from "../fixerAPI.js";

const router = express.Router();

router.get("/", async (req, res) => {
  let results = await getMenu();
  res.render("menuDisplay", {
    items: results,
  });
});

router.post("/submit", (req, res) => {
  addOrder(req.body);
});

router.get("/currencyConvert", async (req, res) => {
  if (req.query.amount != 0) {
    const response = await convertCurrency(
      req.query.to,
      req.query.from,
      req.query.amount
    );
    res.send(response["result"].toString());
  }
});

export default router;
