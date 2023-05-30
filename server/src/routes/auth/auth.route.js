const express = require("express");

const passportInstance = require("../../libs/passport");
const { controllerAuthLocalLogin, controllerAuthThirdParty, verifyAuth, controllerLogoutUser, controllerAuthLocalRegister } = require("./auth.controller");
const user = require("../../middlewares/user.middleware");

const authRouter = express.Router();

authRouter.post("/local/login", passportInstance.authenticate("local"), controllerAuthLocalLogin);
authRouter.get("/google", passportInstance.authenticate("google", { scope: ["email", "profile"] }));
authRouter.get("/google/callback", passportInstance.authenticate("google", { failureRedirect: `${process.env.CLIENT_URL}/auth/login` }), controllerAuthThirdParty);
authRouter.get("/verify", user, verifyAuth);
authRouter.get("/logout", user, controllerLogoutUser);
authRouter.post("/local/register", passportInstance.authenticate("local"), controllerAuthLocalRegister);

module.exports = authRouter;
