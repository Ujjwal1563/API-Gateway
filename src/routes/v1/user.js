const express = require("express");
const router = express.Router();
const { UserController } = require("../../controllers");
const { AuthRequestMiddlewares } = require("../../middlewares");

router.post(
  "/signup",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signup
);
router.post(
  "/signin",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signin
);

module.exports = router;
