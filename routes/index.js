const router = require("express").Router();
const { createUser, loginUser } = require("../controllers/users");

router.post("/signin", loginUser);
router.post("/signup", createUser);
router.use("/users", require("./users"));
router.use("/items", require("./clothingItems"));

module.exports = router;
