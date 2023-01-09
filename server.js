import express from "express";
import bp from "body-parser";
import userRouter from "./routes/user.js";
import restaurantRouter from "./routes/restaurant.js";

const app = express();

app.set("view engine", "ejs");

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { title: "Square Food" });
});

app.use("/user", userRouter);
app.use("/restaurant", restaurantRouter);

app.listen(8080);
