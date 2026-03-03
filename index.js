const express = require("express");
const app = express();
const connectDB = require("./src/config/connectDb")

require("dotenv").config();

const port = process.env.PORT;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
    console.log(`Example app listening at http://${host}:${port}`);
});