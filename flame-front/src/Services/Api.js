import axios from "axios";

export default class Api {
	constructor() {
		this.url = "http://localhost:3001";
	}

	registerClient(client) {
		return axios.post(this.url + "/client/registerClient", client);
	}

	registerEnterprise(enterprise) {
		return axios.post(this.url + "/enterprise/registerEnterprise", enterprise);
	}
	registerAnnounce(announce) {
		return axios.post(this.url + "/announce/registerAnnounce", announce);
	}

	///// Logins /////

	clientLogin(email, password) {
		return axios.post(this.url + "/client/clientLogin", {
			email: email,
			password: password
		});
	}

	enterpriseLogin(email, password) {
		return axios.post(this.url + "/enterprise/enterpriseLogin", {
			email: email,
			password: password
		});
	}

	checkToken(token) {
		return axios.post(this.url + "/entreprise/checkToken", {
			token: token
		});
	}

	publierAnnonce(annonce, urlImage) {
		return axios.post(this.url + "/enterprise/publierAnnonce", {
			annonce: annonce,
			urlImage: urlImage
		});
	}

	uploadFile(formData) {
		const config = {
			headers: {
				"content-type": "multipart/form-data"
			}
		};
		return axios.post(this.url + "/enterprise/uploadFile", formData, config);
	}

	updateAnnonce(annonce, urlImage) {
		return axios.post(this.url + "/enterprise/updateAnnonce", {
			annonce: annonce,
			urlImage: urlImage
		});
	}

	getAnnonces(enterprise) {
		return axios.post(this.url + "/enterprise/getAnnonces", {
			enterprise: enterprise
		});
	}

	// route pour récupérer les premières annonces seulement
	getFirstAnnonces() {
		return axios.get(this.url + "/client/getFirstAnnonces");
	}

	deleteAnnonce(id) {
		return axios.delete(this.url + "/enterprise/deleteAnnonce/" + id);
	}

	// pour le client
	getAllAnnonces() {
		return axios.get(this.url + "/client/getAllAnnonces");
	}

	commander(panier, client) {
		return axios.post(this.url + "/client/commander", {
			panier: panier,
			client: client
		});
	}

	getAnnonceById(annonceId) {
		return axios.get(this.url + "/client/getAnnonceById/" + annonceId);
	}
	checkToken(token) {
		return axios.post(this.url + "/client/checkToken", {
			token: token
		});
	}

	checkTokenEnt(token) {
		return axios.post(this.url + "/enterprise/checkTokenEnt", {
			token: token
		});
	}

	getMesCommandes(client) {
		return axios.post(this.url + "/client/getMesCommandes", {
			client: client
		});
	}
}
