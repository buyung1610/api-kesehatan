const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;
const BlacklistToken = require("../modules/auth/blacklistToken.model");
const { errorResponse } = require("../helpers/response");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token)
    return errorResponse(res, 401, "Validation Error", [
      {
        field: "token",
        message: "Token tidak ditemukan",
      },
    ]);

  const blacklisted = await BlacklistToken.findOne({ token });
  if (blacklisted) {
    return errorResponse(res, 401, "Validation Error", [
      {
        field: "token",
        message: "Token sudah di-blacklist",
      },
    ]);
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, 403, "Validation Error", [
      {
        field: "token",
        message: "Token tidak valid",
      },
    ]);
  }
}

module.exports = verifyToken;
