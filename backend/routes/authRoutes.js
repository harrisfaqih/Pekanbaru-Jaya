const authControllers = require("../controllers/authControllers");
const { authMiddlewares } = require("../middlewares/authMiddlewares");
const router = require("express").Router();

router.post("/admin-login", authControllers.admin_login);
router.get("/get-user", authMiddlewares, authControllers.getUser);

module.exports = router;
