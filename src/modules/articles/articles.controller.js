const articleService = require("./articles.service");
const { successResponse, errorResponse } = require("../../helpers/response");

const articleController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      const { articles, totalData, totalPages } =
        await articleService.getAll({ page, limit, search });

      if (articles.length === 0) {
        return errorResponse(res, 404, "Not Found", [
          { field: "article", message: "Article kosong" },
        ]);
      }

      return successResponse(res, "Berhasil mengambil data", {
        page,
        limit,
        totalPages,
        totalData,
        articles,
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, "Server Error", [
        { field: "server", message: "Terjadi kesalahan server" },
      ]);
    }
  },
  
  getByUserId: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";
      const userId = req.user.id;

      const { articles, totalData, totalPages } =
        await articleService.getByUserId({ page, limit, search, userId });

      if (articles.length === 0) {
        return errorResponse(res, 404, "Not Found", [
          { field: "article", message: "Article kosong" },
        ]);
      }

      return successResponse(res, "Berhasil mengambil data", {
        page,
        limit,
        totalPages,
        totalData,
        articles,
      });
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, "Server Error", [
        { field: "server", message: "Terjadi kesalahan server" },
      ]);
    }
  },
};

module.exports = articleController;