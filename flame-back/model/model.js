// Il charge le driver mongoose
var mongoose = require("mongoose");

var connect = function(callback) {
	mongoose.set("debug", true);
	mongoose.connect(
		"mongodb+srv://admin:admin@cluster0-vpicu.mongodb.net/smartjob?retryWrites=true&w=majority"
	);
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, " Connection error"));
	db.once("open", function() {
		console.log("Super, vous êtes connecté à la base de données");
		callback();
	});
};

// création d'une Erreur

var processError = function(err, res, callback) {
	if (err) {
		res.json({
			success: false,
			error: {
				message: err.message
			}
		});
	} else {
		callback();
	}
};

module.exports.processError = processError;
module.exports.connect = connect;
