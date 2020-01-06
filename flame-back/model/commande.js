var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commandeSchema = new Schema({
        panier: [],

        acheteur: {
                type: Schema.Types.ObjectId,
                ref: "Client"
        },
        total: Number,
        date: {
                type: Date,
                default: new Date()
        }
});

var Commande = mongoose.model("Commande", commandeSchema);
exports.Commande = Commande;
