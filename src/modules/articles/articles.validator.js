const { body, query, param } = require("express-validator");

const blogValidator = {
  create: [
    body("title")
      .exists()
      .withMessage("Judul wajib diisi")
      .bail()
      .notEmpty()
      .withMessage("Judul wajib diisi")
      .isString()
      .withMessage("Judul harus berupa teks")
      .isLength({ min: 5 })
      .withMessage("Judul minimal terdiri dari 5 karakter"),

    body("date")
      .exists()
      .withMessage("Tanggal wajib diisi")
      .bail()
      .notEmpty()
      .withMessage("Tanggal wajib diisi")
      .isISO8601()
      .withMessage(
        "Format tanggal tidak valid (gunakan format ISO 8601, contoh: 2025-08-01)",
      ),

    body("description")
      .exists()
      .withMessage("Deskripsi wajib diisi")
      .bail()
      .notEmpty()
      .withMessage("Deskripsi wajib diisi")
      .isString()
      .withMessage("Deskripsi harus berupa teks")
      .isLength({ min: 10 })
      .withMessage("Deskripsi minimal terdiri dari 10 karakter"),

    body("category")
      .optional()
      .isString()
      .withMessage("Category harus berupa teks"),
  ],

  update: [
    param("id").isMongoId().withMessage("ID tidak valid"),

    body("title")
      .optional()
      .isString()
      .withMessage("Judul harus berupa teks")
      .isLength({ min: 5 })
      .withMessage("Judul minimal terdiri dari 5 karakter"),

    body("date")
      .optional()
      .isISO8601()
      .withMessage(
        "Format tanggal tidak valid (gunakan format ISO 8601, contoh: 2025-08-01)",
      ),

    body("description")
      .optional()
      .isString()
      .withMessage("Deskripsi harus berupa teks")
      .isLength({ min: 10 })
      .withMessage("Deskripsi minimal terdiri dari 10 karakter"),

    body("category")
      .optional()
      .isString()
      .withMessage("category harus berupa teks"),
  ],

  getAll: [
    query("page").optional().isInt().withMessage("Page harus berupa angka"),
    query("limit").optional().isInt().withMessage("Limit harus berupa angka"),
    query("search")
      .optional()
      .isString()
      .withMessage("Search harus berupa teks"),
  ],

  getByUserId: [
    query("page").optional().isInt().withMessage("Page harus berupa angka"),
    query("limit").optional().isInt().withMessage("Limit harus berupa angka"),
    query("search")
      .optional()
      .isString()
      .withMessage("Search harus berupa teks"),
  ],

  getById: [param("id").isMongoId().withMessage("ID tidak valid")],
};

module.exports = blogValidator;