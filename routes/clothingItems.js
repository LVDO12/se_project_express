const router = require('express').Router();
const { getItems, createItem, getItemById, likeItem, disLikeItem, deleteItemById } = require('../controllers/clothingItems');

router.get('/', getItems);
router.post('/', createItem);
router.get('/:userId', getItemById);
router.put('/:itemId/likes',likeItem);
router.delete('/:itemId/likes',disLikeItem);
router.delete('/:itemId', deleteItemById);
router.use((req, res) => {
  res.status(404).send({ message: 'Resource not found' });
});

module.exports = router;