const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/auth");
const { authenticate } = require("../../middlewares");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

module.exports = router;
