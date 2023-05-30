require("dotenv").config();
const passportInstance = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_AUTH_OPTIONS = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
};

// Configure Local Strategy
passportInstance.use(
	new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
		let data = { email, password, provider: "local" };
		done(null, data);
	})
);

// Define your Passport.js authentication strategies
// GMAIL authentication strategies
passportInstance.use(
	new GoogleStrategy(GOOGLE_AUTH_OPTIONS, async (accessToken, refreshToken, profile, done) => {
		let data = {
			id: profile?.id,
			email: profile?._json?.email || "",
			provider: "google",
		};

		done(null, data);
	})
);

passportInstance.serializeUser(function (user, done) {
	done(null, user);
});

passportInstance.deserializeUser(function (user, done) {
	done(null, user);
});
module.exports = passportInstance;
