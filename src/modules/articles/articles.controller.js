const articleService = require("./articles.service");
const { successResponse, errorResponse } = require("../../helpers/response");

const articleController = {
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const search = req.query.search || "";

      const { articles, totalData, totalPages } = await articleService.getAll({
        page,
        limit,
        search,
      });

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

  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const article = await articleService.getById(id);

      if (!article) {
        return res.status(404).json({
          success: false,
          message: "Article tidak ditemukan",
        });
      }

      res.json({
        success: true,
        message: "Berhasil mengambil data",
        data: article,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Terjadi kesalahan server",
      });
    }
  },

  createArticle: async (req, res) => {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return errorResponse(res, 400, "Bad Request", [
          { field: "user", message: "User tidak ditemukan, silahkan login" },
        ]);
      }

      if (!req.file) {
        return errorResponse(res, 400, "Bad Request", [
          { field: "image", message: "Image harus diupload" },
        ]);
      }

      const article = await articleService.createArticle({
        userId,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        image: req.file ? req.file.filename : null,
      });

      return successResponse(res, "Article berhasil ditambahkan", article, 201);
    } catch (error) {
      console.error(error);
      return errorResponse(res, 500, "Server Error", [
        { field: "server", message: error.message },
      ]);
    }
  },

  updateArticle: async (req, res) => {
    try {
      const userId = req.user?.id;
      const id = req.params.id;

      const article = await articleService.updateArticle({
        id,
        userId,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        date: req.body.date,
        image: req.file ? req.file.filename : null,
      });

      return successResponse(res, "Article berhasil diperbarui", article);
    } catch (error) {
      console.error(error);

      return errorResponse(res, 400, "Bad Request", [
        { field: "article", message: error.message },
      ]);
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const userId = req.user?.id;
      const id = req.params.id;

      await articleService.deleteArticle({ id, userId });

      return successResponse(res, "Article berhasil dihapus");
    } catch (error) {
      console.error(error);

      return errorResponse(res, 400, "Bad Request", [
        { field: "article", message: error.message },
      ]);
    }
  },
};

module.exports = articleController;
