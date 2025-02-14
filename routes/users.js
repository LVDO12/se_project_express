const router = require('express').Router();
const { getUsers, createUser, getUserById } = require('../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.use((req, res) => {
  res.status(404).send({ message: 'Resource not found' });
});

module.exports = router;