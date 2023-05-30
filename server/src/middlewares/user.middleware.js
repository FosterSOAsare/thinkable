const asyncHandler = require("express-async-handler");
const user = asyncHandler(async (req, res, next) => {
	req.session.user = { email: "fostersoasare@gmail.com", provider: "google", _id: "6475dfa67e77f0e4017d2d56" };
	if (!req?.session?.user) {
		res.status(401);
		throw new Error("User not authorized");
	}
	next();
});

module.exports = user;
