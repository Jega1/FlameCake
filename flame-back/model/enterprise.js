var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");

//function pour générer un salt de 128 octets
const genSalt = function() {
	return crypto.randomBytes(128).toString("base64");
};


const genHash = function(password, salt) {
	let hash = crypto.createHash("sha512");
	hash.update(salt);
	hash.update(password);
	return hash.digest("hex");
};

var enterpriseSchema = new Schema({
	nom: String,
	ref: String,
	ville: String,
	domaine: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: new Date()
	},
	salt: String
});

enterpriseSchema.pre("save", function(next) {
	if (this.isNew) {
		this.salt = genSalt();
		this.password = genHash(this.password, this.salt);
	}
	next();
});

enterpriseSchema.methods.validatePassword = function(password) {
	if (this.password === genHash(password, this.salt)) {
		return true;
	} else {
		return false;
	}
};

var Enterprise = mongoose.model("Enterprise", enterpriseSchema);
exports.Enterprise = Enterprise;
