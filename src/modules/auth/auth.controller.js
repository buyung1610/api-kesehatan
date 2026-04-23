const authService = require("./auth.service");
const { successResponse, errorResponse } = require("../../helpers/response");

const authControllers = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const result = await authService.login(
        username,
        password,
        process.env.SECRET_KEY,
      );

      return successResponse(res, "Login berhasil", {
        token: result.token,
        user: result.user,
      });
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        return errorResponse(res, 401, "Validation Error", [
          {
            field: "username",
            message: "Username tidak ditemukan",
          },
        ]);
      }

      if (error.message === "INVALID_PASSWORD") {
        return errorResponse(res, 401, "Validation Error", [
          {
            field: "password",
            message: "Password salah",
          },
        ]);
      }

      console.error("LOGIN ERROR:", error);

      return errorResponse(res, 500, "Server Error", [
        {
          field: "server",
          message: "Terjadi kesalahan server",
        },
      ]);
    }
  },

  register: async (req, res) => {
    try {
      const { name, username, password } = req.body;

      console.log("BODY:", req.body);

      await authService.register(name, username, password);

      return successResponse(res, "Registrasi berhasil");
    } catch (error) {
      if (error.message === "USERNAME_EXISTS") {
        return errorResponse(res, 400, "Validation Error", [
          {
            field: "username",
            message: "Username sudah digunakan",
          },
        ]);
      }

      console.error("REGISTER ERROR:", error);

      return errorResponse(res, 500, error.message, [
        {
          field: "server",
          message: error.message,
        },
      ]);
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      await authService.logout(token);

      return successResponse(res, "Logout berhasil, token di-blacklist");
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      return errorResponse(res, 500, error.message, [
        {
          field: "server",
          message: error.message,
        },
      ]);
    }
  },

  getProfile: async (req, res) => {
    try {
      const result = await authService.getProfile(req.user.id);

      return successResponse(res, "Berhasil mengambil data user", result);
    } catch (error) {
      if (error.message === "USER_NOT_FOUND") {
        return errorResponse(res, 404, "Validation Error", [
          {
            field: "user",
            message: "User tidak ditemukan",
          },
        ]);
      }

      console.error("GET PROFILE ERROR:", error);

      return errorResponse(res, 500, "Server Error", [
        {
          field: "server",
          message: "Terjadi kesalahan server",
        },
      ]);
    }
  },
};

module.exports = authControllers;
