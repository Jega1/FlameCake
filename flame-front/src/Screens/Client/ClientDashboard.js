import React, { Component } from "react";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardLink,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col,
	Button
} from "reactstrap";
import Api from "../../Services/Api";
import AnnonceDetaille from "./AnnonceDetaille";

export default class ClientDashboard extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			client: {},
			annonces: []
		};
	}
	componentDidMount() {
		let token = localStorage.getItem("tokenClient");
		let c = localStorage.getItem("client");

		if (token && c) {
			// si le token est présent dans le localstorage, il faut en plus vérifier si ce token est valide
			// on l'envoie à nodejs, nodejs le déchiffre avec le secret key et vérifie si ce token correspond à un user id
			this.api.checkToken(token).then(res => {
				if (res.data.success) {
					this.setState({ client: res.data.client });
					this.api.getAllAnnonces().then(res => {
						console.log(res.data);
						this.setState({
							annonces: res.data.allAnnonces
						});
					});
				} else {
					localStorage.clear();
					window.location = "/clientLogin";
				}
			});
		} else {
			localStorage.clear();
			window.location = "/clientLogin";
		}
	}

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};

	// panier
	ajouterAuPanier = annonce => {
		let panier = JSON.parse(localStorage.getItem("panier"));
		if (panier) {
			// si le panier existe, on le prend et on y ajoute le nouvel article
			panier.push(annonce);
			localStorage.setItem("panier", JSON.stringify(panier));
		} else {
			// si le panier n'existe pas encore, on le créé
			let p = [];
			p.push(annonce);
			localStorage.setItem("panier", JSON.stringify(p));
		}
		//window.location.reload();
		this.props.reloadPanier();
	};

	render() {
		let annonces = this.state.annonces.map((annonce, index) => {
			return (
				<Col
					md="4"
					style={{ width: "100%", minHeight: "50vh", marginTop: "10rem" }}
				>
					<Card
						key={index}
						style={{
							backgrounColor: "whitesmoke",
							boxShadow: "0px 20px 25px rgba(0, 0, 0, 0.42)"
						}}
					>
						<CardImg
							top
							width="100%"
							height="300px"
							src={annonce.photo}
							alt="Card image cap"
						/>
						<CardBody>
							<CardTitle style={{ fontSize: "1.5rem", color: "#f59432" }}>
								Nom : {annonce.nom}
							</CardTitle>
							<CardSubtitle style={{ fontSize: "1.5rem", color: "green" }}>
								Prix :{annonce.prix}€
							</CardSubtitle>
							<CardSubtitle style={{ fontSize: "1.5rem" }}>
								Taille : {annonce.taille}
							</CardSubtitle>
						</CardBody>
						<CardBody>
							<CardText>Description: {annonce.description}</CardText>
							<Button
								color="primary"
								onClick={() => this.ajouterAuPanier(annonce)}
							>
								Ajouter au panier
							</Button>
							<Button
								color="success"
								onClick={() => (window.location = "/annonce/" + annonce._id)}
							>
								Voir le produits
							</Button>
						</CardBody>
					</Card>
				</Col>
			);
		});

		return (
			<div>
				<Container>
					<Row>{annonces}</Row>
				</Container>
			</div>
		);
	}
}
