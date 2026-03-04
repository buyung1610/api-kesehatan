const express = require("express");
const app = express();
const connectDB = require("./config/connectDb");
const routes = require("./routes");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const host = process.env.HOST || "localhost";

connectDB();

app.use(routes);
app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});
