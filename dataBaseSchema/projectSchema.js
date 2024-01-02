const { Schema, SchemaTypes, model } = require("mongoose");

const projectSchema = new Schema({
	cod: {
		type: SchemaTypes.String,
		required: true,
	},
	name: {
		type: SchemaTypes.String,
		required: true,
	},
	standard: {
		type: SchemaTypes.String,
		required: true,
	}
});

const project = model("Project", projectSchema);

module.exports = project;