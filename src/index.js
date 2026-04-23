const express = require("express");
const app = express();
const connectDB = require("./config/connectDb");
const routes = require("./routes");
const cors = require("cors");
const path = require("path");
const cron = require("node-cron");
const seedArticles = require("./seeders/articlesSeeder");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Folder statis untuk melihat gambar
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
      res.setHeader("Content-Type", "image/jpeg");
    } else if (filePath.endsWith(".png")) {
      res.setHeader("Content-Type", "image/png");
    }
  }
}));

// Job jalan tiap jam 12
cron.schedule('0 0 * * *', async () => {
  console.log("Cron jalan:", new Date().toLocaleString());
  try {
    await seedArticles(); // tunggu sampai selesai
  } catch (error) {
    console.error("Error di cron job:", error);
  }
});


const port = process.env.PORT;
const host = process.env.HOST || "localhost";

connectDB();

app.use(routes);
app.listen(port, host, () => {
  console.log(`Example app listening at http://${host}:${port}`);
});
