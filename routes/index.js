const router = require("express").Router();
const { createUser, loginUser } = require("../controllers/users");
const {validateSignIn, validateSignUp} = require("../middlewares/validator");

router.post("/signin", validateSignIn, loginUser);
router.post("/signup", validateSignUp, createUser);
router.use("/users", require("./users"));
router.use("/items", require("./clothingItems"));

module.exports = router;
