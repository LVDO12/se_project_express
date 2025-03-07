const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getItems,
  createItem,
  likeItem,
  disLikeItem,
  deleteItemById,
} = require("../controllers/clothingItems");

router.get("/", getItems);
router.post("/", auth, createItem);
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, disLikeItem);
router.delete("/:itemId", auth, deleteItemById);

module.exports = router;
