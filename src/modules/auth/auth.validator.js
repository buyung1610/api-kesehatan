const { body } = require("express-validator");

const authValidator = {
  registerValidator: [
    body("name")
      .exists()
      .withMessage("Name wajib diisi")
      .bail()
      .isString()
      .withMessage("Name harus berupa teks")
      .notEmpty()
      .withMessage("Name wajib diisi")
      .isLength({ min: 3 })
      .withMessage("Name minimal 3 karakter"),

    body("username")
      .exists()
      .withMessage("Username wajib diisi")
      .bail()
      .isString()
      .withMessage("Username harus berupa teks")
      .notEmpty()
      .withMessage("Username wajib diisi")
      .isAlphanumeric()
      .withMessage("Username hanya boleh huruf dan angka")
      .bail()
      .matches(/^\S+$/)
      .withMessage("Username tidak boleh mengandung spasi"),

    body("password")
      .exists()
      .withMessage("Password wajib diisi")
      .bail()
      .isString()
      .withMessage("Password harus berupa teks")
      .notEmpty()
      .withMessage("Password wajib diisi")
      .isLength({ min: 6 })
      .withMessage("Password minimal 6 karakter")
      .bail()
      .matches(/^\S+$/)
      .withMessage("Password tidak boleh mengandung spasi"),
  ],

  loginValidator: [
    body("username")
      .exists()
      .withMessage("Username wajib diisi")
      .bail()
      .isString()
      .withMessage("Username harus berupa teks")
      .notEmpty()
      .withMessage("Username wajib diisi")
      .isAlphanumeric()
      .withMessage("Username hanya boleh huruf dan angka")
      .bail()
      .matches(/^\S+$/)
      .withMessage("Username tidak boleh mengandung spasi"),

    body("password")
      .exists()
      .withMessage("Password wajib diisi")
      .bail()
      .isString()
      .withMessage("Password harus berupa teks")
      .notEmpty()
      .withMessage("Password wajib diisi")
      .bail()
      .matches(/^\S+$/)
      .withMessage("Password tidak boleh mengandung spasi"),
  ],

  updateProfileValidator: [
    body("name")
      .optional()
      .isString()
      .withMessage("Name harus berupa teks")
      .isLength({ min: 3 })
      .withMessage("Name minimal 3 karakter"),

    body("username")
      .optional()
      .isString()
      .withMessage("Username harus berupa teks")
      .isAlphanumeric()
      .withMessage("Username hanya boleh huruf dan angka")
      .bail()
      .matches(/^\S+$/)
      .withMessage("Username tidak boleh mengandung spasi"),

    body("password")
      .optional()
      .isString()
      .withMessage("Password harus berupa teks")
      .isLength({ min: 6 })
      .withMessage("Password minimal 6 karakter")
      .bail()
      .matches(/^\S+$/)
      .withMessage("Password tidak boleh mengandung spasi"),
  ],
};

module.exports = authValidator;
