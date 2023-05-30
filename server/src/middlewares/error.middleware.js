function errors(err, req, res, next) {
	res.statusCode === 200 && res.status(500);
	if (err) {
		res.json({ error: err.message });
	}
	console.log({ error: err.message });
}

module.exports = errors;
