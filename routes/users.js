const router = require('express').Router();
const {getCurrentUser, updateProfile } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUpdateProfile } = require('../middlewares/validator');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, validateUpdateProfile, updateProfile);

module.exports = router;