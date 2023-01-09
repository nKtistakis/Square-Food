const express = require("express");
const router = express.Router();
var database = require("./../database");

function log() {
  console.log("FInaly--------------------------------");
}

router.get("/", async (req, res) => {
  let results = await database.getMenu();
  res.render("menuDisplay", {
    items: results,
  });
});

router.post("/submit", (req, res) => {
  database.addOrder(req.body);
});

module.exports = router;
