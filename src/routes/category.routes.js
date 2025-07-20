const { Router } = require("express");
const CategoryController = require("../controllers/CategoryController");

const router = Router();

router.post("/create", CategoryController.createCategory);
router.get("/", CategoryController.getCategories);

module.exports = router;
