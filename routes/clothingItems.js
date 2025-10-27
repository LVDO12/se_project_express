const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getItems,
  createItem,
  likeItem,
  disLikeItem,
  deleteItemById,
} = require("../controllers/clothingItems");
const {validateItemId, validateCreateItem} = require("../middlewares/validator");

router.get("/", getItems);
router.post("/", validateCreateItem, auth, createItem);
router.put("/:itemId/likes", auth, validateItemId, likeItem);
router.delete("/:itemId/likes", auth, validateItemId, disLikeItem);
router.delete("/:itemId", auth, validateItemId, deleteItemById);

module.exports = router;
