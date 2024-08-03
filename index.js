const sendNotification = require("./app/utilities/sendNotification");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const moment = require("moment");
const authMiddleware = require("./app/middleware/authmiddleWare");
require("dotenv").config();
const auth = require("./app/routes/auth");
const profile = require("./app/routes/profile");
const app = express();
const date = moment().format("Do MMMM YYYY");
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected successfully to MongoDB server");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors({ origin: true, credentials: true }));
app.set("port", process.env.PORT || 8000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5000kb" }));

app.use("/api/v1/auth", auth);
app.use("/api/v1/profile", authMiddleware, profile);

app.post("/api/v1/send-notification", async (req, res) => {
  const { title, body, topic } = req.body;

  try {
    await sendNotification(title, body, topic);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending notification" });
  }
});


app.get("/", async (req, res) => {
  return res.status(200).json({ message: "Welcome to Bragtime" });
});

app.listen(app.get("port"), () =>
  console.log(
    `\n********************************************\n         __________________________  \n\n \t    |  SERVER STARTED | \n         __________________________  \n            \n  \t      ${date} \n\n********************************************`
  )
);
