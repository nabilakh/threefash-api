const router = require("express").Router();
const productController = require('../controllers/productController');
const {productAutho} = require('../middlewares/authorization');

router.post("/create", productController.create);
router.get("/all", productController.all);
router.put("/:id", productAutho, productController.update);
router.delete("/:id", productAutho, productController.delete);

module.exports = router;