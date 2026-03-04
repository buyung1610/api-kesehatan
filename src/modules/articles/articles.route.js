const router = require("express").Router();
const ArticleController = require("./articles.controller");
const verifyToken = require("../../middleware/verifyToken");
const articleValidator = require("./articles.validator");
const validate = require("../../middleware/validate");

router.use(verifyToken);

router.get("/", articleValidator.getAll, validate, ArticleController.getAll);

router.get("/user", articleValidator.getByUserId, validate, ArticleController.getByUserId);

module.exports = router;