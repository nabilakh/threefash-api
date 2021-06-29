const router = require("express").Router();
const cartController = require('../controllers/cartController');

router.post("/create", cartController.create);
router.get("/all", cartController.all);
router.put("/:id", cartController.update);
router.delete("/:id", cartController.delete);

module.exports = router;