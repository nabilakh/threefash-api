const router = require("express").Router();
const categoryController = require('../controllers/categoryController');
const {categoryAutho} = require('../middlewares/authorization');

router.post("/create", categoryController.create);
router.get("/all", categoryController.all);
router.put("/:id", categoryAutho, categoryController.update);
router.delete("/:id", categoryAutho, categoryController.delete);

module.exports = router;