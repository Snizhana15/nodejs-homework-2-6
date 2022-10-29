const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const { authenticate } = require("../../middlewares");

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getContactById);

router.post("/", authenticate, ctrl.addContact);

router.delete("/:contactId", authenticate, ctrl.removeContact);

router.put("/:contactId", authenticate, ctrl.updateContact);

router.patch("/:contactId/favorite", authenticate, ctrl.updateStatusContact);

module.exports = router;
