const router = require("express").Router();
const articleController = require("./articles.controller");
const verifyToken = require("../../middleware/verifyToken");
const articleValidator = require("./articles.validator");
const validate = require("../../middleware/validate");

router.use(verifyToken);

router.get("/", articleValidator.getAll, validate, articleController.getAll);

router.get("/user", articleValidator.getByUserId, validate, articleController.getByUserId);

router.get("/:id", articleValidator.getById, validate, articleController.getById);

module.exports = router;