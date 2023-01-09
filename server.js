const express = require("express");
const app = express();
const bp = require("body-parser");

app.set("view engine", "ejs");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Square Food" });
});

const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");

app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);

app.listen(8080);
