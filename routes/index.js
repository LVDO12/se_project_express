const router = require("express").Router();
const { createUser, loginUser } = require("../controllers/users");
const {validateLogin, validateSignUp} = require("../middlewares/validator");

router.post("/signin", validateLogin, loginUser);
router.post("/signup", validateSignUp, createUser);
router.use("/users", require("./users"));
router.use("/items", require("./clothingItems"));

module.exports = router;
