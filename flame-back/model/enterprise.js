var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");

//Cette fonction permet de générer un salt de 128 bits (aléatoire)
const genSalt = function() {
	return crypto.randomBytes(128).toString("base64");
};

// permet de mélanger le password avec le salt
// ensuite de chiffrer ce mélange
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

// avant d'enregistrer l'entreprise on effectue cette action
enterpriseSchema.pre("save", function(next) {
	if (this.isNew) { // si c'est la collection est nouvelle
		this.salt = genSalt(); // on génère un salt
		this.password = genHash(this.password, this.salt); // on mélange le salt avec le mot de passe ensuite on lechiffre
	}
	next();
});


// cette fonction est pour valider le mot de passe pour login
enterpriseSchema.methods.validatePassword = function(password) {
	// on compare le mot de passe chiffré avec ce qui est dans la base de données
	if (this.password === genHash(password, this.salt)) {
		// si c'est correct on envoie true
		return true;
	} else {
		return false;
	}
};

var Enterprise = mongoose.model("Enterprise", enterpriseSchema);
exports.Enterprise = Enterprise;
