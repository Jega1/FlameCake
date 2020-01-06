import React, { Component } from "react";

import Api from "../../Services/Api";

import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col,
	Button
} from "reactstrap";

export default class AnnonceDetaille extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			annonce: null
		};
	}

	componentDidMount() {
		this.api.getAnnonceById(this.props.match.params.annonceId).then(res => {
			if (res.data.success) {
				this.setState({ annonce: res.data.annonce });
				console.log(this.state);
			} else {
				alert(res.data.message);
			}
		});
	}

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
	};

	render() {
		if (this.state.annonce) {
			return (
				<Card style={{ height: "500px", marginTop: "20px", width: "500px" }}>
					<CardImg
						top
						width="100%"
						src={this.state.annonce.photo}
						alt="Card image cap"
					/>
					<CardBody>
						<CardTitle>{this.state.annonce.nom}</CardTitle>
						<CardSubtitle>{this.state.annonce.prix}$</CardSubtitle>
					</CardBody>
					<CardBody>
						<CardText>{this.state.annonce.description}</CardText>
						<Button
							color="primary"
							onClick={() => this.ajouterAuPanier(this.state.annonce)}
						>
							Ajouter au panier
						</Button>
						<Button
							color="primary"
							onClick={() =>window.location="/clientDashboard"}
						>
							Retour
						</Button>
					</CardBody>
				</Card>
			);
		} else {
			return <div>Annonce non trouvée</div>;
		}
	}
}
