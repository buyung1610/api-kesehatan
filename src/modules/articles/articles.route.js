const router = require("express").Router();
const articleController = require("./articles.controller");
const verifyToken = require("../../middleware/verifyToken");
const articleValidator = require("./articles.validator");
const validate = require("../../middleware/validate");
const upload = require("../../middleware/upload");

router.use(verifyToken);

router.get("/", articleValidator.getAll, validate, articleController.getAll);

router.get("/user", articleValidator.getByUserId, validate, articleController.getByUserId);

router.get("/:id", articleValidator.getById, validate, articleController.getById);

router.post("/create", upload.single("image"), articleValidator.create, validate, articleController.createArticle);

router.put("/update/:id", upload.single("image"), articleValidator.update, validate, articleController.updateArticle);

router.delete("/delete/:id", articleValidator.delete, validate, articleController.deleteArticle);

module.exports = router;