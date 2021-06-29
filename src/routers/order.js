const router = require("express").Router();
const orderController = require('../controllers/orderController');

router.post("/add", orderController.create);
router.get("/all", orderController.all);
router.put("/:id", orderController.update);
router.delete("/:id", orderController.delete);

module.exports = router;