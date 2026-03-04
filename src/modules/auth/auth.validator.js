const { body } = require('express-validator');

const authValidator = {
  registerValidator: [
    body('name')
      .exists().withMessage('Name wajib diisi')
      .bail()
      .isString().withMessage('Name harus berupa teks')
      .notEmpty().withMessage('Name wajib diisi')
      .isLength({ min: 3 }).withMessage('Name minimal 3 karakter'),

    body('email')
      .exists().withMessage('Email wajib diisi')
      .bail()
      .isEmail().withMessage('Email tidak valid')
      .notEmpty().withMessage('Email wajib diisi'),

    body('username')
      .exists().withMessage('Username wajib diisi')
      .bail()
      .isString().withMessage('Username harus berupa teks')
      .notEmpty().withMessage('Username wajib diisi')
      .isAlphanumeric().withMessage('Username hanya boleh huruf dan angka'),

    body('password')
      .exists().withMessage('Password wajib diisi')
      .bail()
      .isString().withMessage('Password harus berupa teks')
      .notEmpty().withMessage('Password wajib diisi')
      .isLength({ min: 6 }).withMessage('Password minimal 6 karakter')
  ],

  loginValidator: [
    body('email')
      .exists().withMessage('Email wajib diisi')
      .bail()
      .isEmail().withMessage('Email tidak valid')
      .notEmpty().withMessage('Email wajib diisi'),

    body('password')
      .exists().withMessage('Password wajib diisi')
      .bail()
      .isString().withMessage('Password harus berupa teks')
      .notEmpty().withMessage('Password wajib diisi'),
  ],
};


module.exports = authValidator;