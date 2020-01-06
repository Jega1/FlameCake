var express = require("express");
var router = express.Router();
var User = require("../model/user").User;

// route pour créer l'utilisateur
router.post("/registerCandidat", (req, res, next) => {
	let u = new User(); // on instancie la classe User pour stocker dans MongoDB
	u.nom = req.body.nom;
	u.prenom = req.body.prenom;
	u.poste = req.body.poste;
	u.email = req.body.email;
	u.ville = req.body.ville;
	u.password = req.body.password;

	u.save((err, user) => {
		if (!err && user) {
			res.json({
				success: true, // on renvoie un objet json au front pour dire que tout s'est bien passé
				message: "Bravo vous avez réussi à créer un compte."
			});
		} else {
			console.log(err);
			res.json({
				success: false, // on renvoie un objet json au front pour dire que il y a un pb
				message: "Impossible de crééer un compte avec les infos fournies."
			});
		}
	});
});

module.exports = router;
