const { Router } = require("express");
const ShippingController = require("../controllers/ShippingController");

const router = Router();

router.post("/create", ShippingController.createShipping);
router.get("/", ShippingController.getShipping);

module.exports = router;