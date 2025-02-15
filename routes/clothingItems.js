const router = require('express').Router();
const { getItems, createItem, likeItem, disLikeItem, deleteItemById } = require('../controllers/clothingItems');

router.get('/', getItems);
router.post('/', createItem);
router.put('/:itemId/likes',likeItem);
router.delete('/:itemId/likes',disLikeItem);
router.delete('/:itemId', deleteItemById);

module.exports = router;