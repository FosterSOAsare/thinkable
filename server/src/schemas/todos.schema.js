const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const todoSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			required: false,
			type: String,
		},
		description: {
			required: true,
			type: String,
		},
		status: {
			required: false,
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Todo", todoSchema);
