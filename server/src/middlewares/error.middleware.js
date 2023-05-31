function errors(err, req, res, next) {
	res.statusCode === 200 && res.status(500);
	let errs = ["InternalOAuthError", "TokenError", "AuthenticationError", "AuthorizationError", "ValidationError", "ProviderError"];
	if (err) {
		if (errs.includes(err.name)) {
			res.redirect(`${process.env.CLIENT_URL}/login?error=true&type=googleauth`);
			return;
		}
		res.json({ error: "an error occurred" + err.message });
	}
	console.log({ error: err.message });
}

module.exports = errors;
