const router = require("express").Router();
const { register, login } = require("../api/auth");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
