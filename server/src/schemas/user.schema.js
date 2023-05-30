const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
	{
		email: {
			required: false,
			type: String,
		},
		password: {
			required: false,
			type: String,
		},
		provider: {
			required: true,
			type: String,
		},
		id: {
			required: false,
			type: String,
		},
	},
	{
		timestamps: true,
	}
);
userSchema.pre("save", async function (next) {
	// Only hash the password if it's new or modified
	if (!this.isModified("password")) {
		return next();
	}
	try {
		await this.hashPassword();
		next();
	} catch (error) {
		return next(error);
	}
});
userSchema.methods.comparePassword = async function (password) {
	try {
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw error;
	}
};
userSchema.methods.hashPassword = async function (password) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password, salt);
		this.password = hashedPassword;
	} catch (error) {
		throw error;
	}
};

module.exports = mongoose.model("User", userSchema);
