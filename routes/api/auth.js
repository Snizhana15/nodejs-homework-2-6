const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.get("/logout", authenticate, ctrl.logout);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
