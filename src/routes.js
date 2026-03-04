const express = require("express");
const app = express();
const authRoutes = require("./modules/auth/auth.route");
const articleRoutes = require("./modules/articles/articles.route");

app.use("/auth", authRoutes);
app.use("/article", articleRoutes);

module.exports = app;