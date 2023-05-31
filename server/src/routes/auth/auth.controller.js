const User = require("../../schemas/user.schema");
const asyncHandler = require("express-async-handler");

const controllerAuthLocalLogin = asyncHandler(async (req, res) => {
	if (!req.isAuthenticated()) {
		res.status(401).json({ success: false, message: "Authentication failed" });
		return;
	}
	// Check if user exists , if no , throw an error else set a session
	let user = await User.findOne({ email: req.user.email.toLowerCase(), provider: "local" });

	if (!user) {
		res.status(400);
		throw new Error("User does not exist");
	}
	// Check user's password
	let valid = await user.comparePassword(req.user.password);
	if (!valid) {
		res.status(400);
		throw new Error("Invalid login credentials. Please check your password and try again");
	}
	req.session.user = { email: user.email, provider: user.provider, _id: user._id };
	res.status(200).json(req.session.user);
});
const controllerAuthThirdParty = asyncHandler(async (req, res) => {
	let { id, provider, email } = req.user;
	// Check if user exists , if no , create a new user
	let user = await User.findOne({ id, provider });
	if (!user) {
		user = await User.create({ id, provider, email });
	}

	// Set session to user's data
	req.session.user = {
		_id: user._id,
		provider: user.provider,
		email: user.email || "",
	};

	res.redirect(`${process.env.CLIENT_URL}/login/verify`);
});
const controllerAuthLocalRegister = asyncHandler(async (req, res) => {
	if (!req.isAuthenticated()) {
		res.status(401).json({ success: false, message: "Authentication failed" });
		return;
	}
	// Check if the user already exists
	let user = await User.findOne({ email: req.user.email.toLowerCase(), provider: "local" });
	if (user) {
		res.status(400);
		throw new Error("User already exists , please sign in");
	}
	// Create new user
	user = new User({ email: req.user.email.toLowerCase(), password: req.user.password, provider: req.user.provider });
	await user.save();

	res.status(200).json({ success: true });
});
const verifyAuth = asyncHandler(async (req, res) => {
	res.status(200).json(req?.session?.user);
});
const controllerLogoutUser = asyncHandler(async (req, res) => {
	if (req.session) {
		let response = await req.session.destroy();
		res.status(200).json({ success: true });
	}
});

module.exports = { controllerAuthLocalLogin, controllerAuthThirdParty, controllerAuthLocalRegister, verifyAuth, controllerLogoutUser };
