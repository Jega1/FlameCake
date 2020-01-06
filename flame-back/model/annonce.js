var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var annonceSchema = new Schema({
	nom: String,
	prix: Number,
	categorie: String,
	quantite: String,
	taille: String,
	description: String,
	file: String,
	enterprise: {
		type: Schema.Types.ObjectId,
		ref: "Enterprise"
	},
	date: {
		type: Date,
		default: new Date()
	},
	photo: String // url de la photo
});

var Annonce = mongoose.model("Annonce", annonceSchema);
exports.Annonce = Annonce;
