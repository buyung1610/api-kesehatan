const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken");

const authControllers = {
  login: async (req, res) => {
    try {
      const { username, password, appSource } = req.body;

      const user = await User.findOne({ username, appSource });
      if (!user) {
        return res.status(401).json({ message: "Username tidak ditemukan" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "password salah" });
      }

      const payload = {
        id: user._id,
        username: user.username,
        name: user.name,
        appSource: user.appSource,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

      res.json({
        success: true,
        message: "Login berhasil",
        token,
        user: payload,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  register: async (req, res) => {
    try {
      const { name, username, password, appSource } = req.body;

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        name,
        username,
        password: hashedPassword,
        appSource,
      });
      await user.save();

      res.json({ success: true, message: "Registrasi berhasil" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(400).json({ message: "Token diperlukan" });

      const decoded = jwt.decode(token);
      console.log("Decoded token:", decoded);
      if (!decoded || !decoded.exp) {
        return res.status(400).json({ message: "Token tidak valid" });
      }

      const expiredAt = new Date(decoded.exp * 1000);

      await BlacklistToken.create({ token, expiredAt });

      res.json({ message: "Logout berhasil, token di-blacklist" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User tidak ditemukan" });
      }

      const result = {
        id: user._id,
        name: user.name,
        username: user.username,
      };
      res.json({
        success: true,
        message: "Berhasil mengambil data user",
        data: result,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },
};

module.exports = authControllers;
