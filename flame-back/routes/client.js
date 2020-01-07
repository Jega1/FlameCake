var express = require("express");
var router = express.Router();
var Client = require("../model/client").Client;
var Annonce = require("../model/annonce").Annonce;
var Commande = require("../model/commande").Commande;
const secret = "3ywb*XEGEC7)";
const jwt = require("jwt-simple");

// fonction pour vérifier l'utilisateur pour le login
function checkUser(email, password) {
	return new Promise((resolve, reject) => {
		email = email.toLowerCase(); // tout le mail on convertit en minuscule
		// on cherche un cleint avec le mail donné
		// findOne c'est ppiur chercher UN UNIQUE client avec ce mail dans la bdd
		Client.findOne({ email: email }, (err, client) => {
			if (err) {
				return reject(err, null);
			}
			if (!client || client === false || !client.validatePassword(password)) {
				return reject(
					{
						type: "wrongCredentials",
						message: "Email ou mot de passe erronné"
					},
					null
				);
			}
			client.password = null; // pour la sécuirté
			client.salt = null; // pour la sécurité
			return resolve({ client: client });
		});
	});
}

// route pour créer l'utilisateur
router.post("/registerClient", (req, res, next) => {
	let candi = new Client(); // on instancie la classe User pour stocker dans MongoDB
	candi.nom = req.body.nom;
	candi.prenom = req.body.prenom;
	candi.adresse = req.body.adresse;
	candi.email = req.body.email;
	candi.ville = req.body.ville;
	candi.password = req.body.password;

	candi.save((err, user) => {
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

// router pour login
router.post("/clientLogin", (req, res) => {
	if (req.body.email && req.body.password) {
		checkUser(req.body.email, req.body.password)
			.then(r => {
				// on génère on token pour le stocker dans le front pour garder la session
				// génération du token si le user ok.
				let token = jwt.encode(r.client._id, secret);

				res.json({
					success: true,
					client: r.client,
					tokenClient: token
				});
			})
			.catch(error => {
				res.json({
					success: false,
					error: error
				});
			});
	} else {
		res.json({
			success: false,
			message: "Rensegnez le mail et le mot de passe"
		});
	}
});

// lister all announce coté de client
router.get("/getAllAnnonces", (req, res) => {
	Annonce.find((error, annonces) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.json({
				success: true,
				allAnnonces: annonces
			});
		}
	});
});

// router pour commander
router.post("/commander", (req, res) => {
	let c = new Commande();
	c.acheteur = req.body.client._id;
	c.panier = req.body.panier;
	c.total = req.body.panier.reduce((acc, current) => acc + current.prix, 0);
	c.save((err, commande) => {
		res.json({ success: true, commande: commande });
	});
});

/// route pour récup les 8 premieres annonces
router.get("/getFirstAnnonces", (req, res) => {
	Annonce.find()
		.limit(8)
		.sort({ date: -1 })
		.exec((err, annonces) => {
			if (!err) {
				res.json({
					success: true,
					annonces: annonces
				});
			} else {
				res.send(400);
			}
		});
});

router.get("/getAnnonceById/:annonceId", (req, res) => {
	console.log(req.params.annonceId);
	if (req.params.annonceId) {
		Annonce.findById(req.params.annonceId, (err, annonce) => {
			if (annonce) {
				res.json({
					success: true,
					annonce: annonce
				});
			} else {
				res.json({
					success: false,
					message: "Annonce non trouvée"
				});
			}
		});
	} else {
		res.send(404);
	}
});

router.post("/checkToken", (req, res) => {
	if (req.body.token) {
		// ici on prend le token envoyé par le front, et on le décode avec le secret pour obtenir un id (qui correspon à l'id du user)
		try {
			let id = jwt.decode(req.body.token, secret);
			console.log("//////////////////////////", id);
			Client.findById(id, (err, client) => {
				// on cherche un user avec cet id pour voir s'il existe dans la base de données
				if (client) {
					client.password = null;
					client.salt = null;
					res.json({
						success: true,
						client: client
					});
				} else {
					// si le user n'existe pas dans la base de données, alors on envoie un false
					res.json({
						success: false
					});
				}
			});
		} catch {
			res.json({
				success: false
			});
		}
	} else {
		res.json({
			success: false
		});
	}
});

router.post("/getMesCommandes", (req, res) => {
	Commande.find({ acheteur: req.body.client._id }, (err, commandes) => {
		if (!err) {
			res.json({
				success: true,
				commandes: commandes
			});
		} else {
			res.json({
				success: false
			});
		}
	});
});

module.exports = router;
