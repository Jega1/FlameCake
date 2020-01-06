var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var venteSchema = new Schema({
	vente: {
		type: Schema.Types.ObjectId,
		ref: "Annonce"
	},
	vendeur: {
		type: Schema.Types.ObjectId,
		ref: "Enterprise"
	},
	acheteur: {
		type: Schema.Types.ObjectId,
		ref: "Client"
	},
	date: {
		type: Date,
		default: new Date()
	}
});

var Vente = mongoose.model("Vente", venteSchema);
exports.Vente = Vente;
