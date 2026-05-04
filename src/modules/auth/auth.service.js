const User = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("./blacklistToken.model");

const authService = {
  login: async (username, password, SECRET_KEY) => {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("INVALID_PASSWORD");
    }

    const payload = {
      id: user._id,
      username: user.username,
      name: user.name,
    };

    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1h",
    });

    return { token, user: payload };
  },

  register: async (name, username, password) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error("USERNAME_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      password: hashedPassword,
    });

    await user.save();
    return true;
  },

  logout: async (token) => {
    const decoded = jwt.decode(token);

    const expiredAt = new Date(decoded.exp * 1000);

    await BlacklistToken.create({ token, expiredAt });

    return true;
  },

  getProfile: async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    return {
      id: user._id,
      name: user.name,
      username: user.username,
    };
  },

  updateProfile: async (userId, name, username, password) => {
    if (username) {
      const existingUser = await User.findOne({ username, _id: { $ne: userId } });
      if (existingUser) {
        throw new Error("USERNAME_EXISTS");
      }
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    // Hash password jika diubah
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    user.name = name || user.name;
    user.username = username || user.username;
    user.password = hashedPassword;

    await user.save();

    return {
      id: user._id,
      name: user.name,
      username: user.username,
    };
  },
};

module.exports = authService;
