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
	Button,
	ListGroup,
	ListGroupItem,
	ListGroupItemText,
	ListGroupItemHeading
} from "reactstrap";

export default class MesVentes extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			ventes: [],
			entreprise: {},
			tokenEntreprise: null,
			mesVentes: []
		};
	}

	componentDidMount() {
		let token = localStorage.getItem("tokenEnterprise");
		let entreprise = JSON.parse(localStorage.getItem("enterprise"));
		this.setState(
			{
				entreprise: entreprise,
				tokenEntreprise: token
			},
			() => {
				if (token && entreprise) {
					// si le token est présent dans le localstorage, il faut en plus vérifier si ce token est valide
					// on l'envoie à nodejs, nodejs le déchiffre avec le secret key et vérifie si ce token correspond à un user id
					/*
					this.api.checkToken(token).then(res => {
						if (res.data.success) {
                            this.setState({ entreprise: res.data.entreprise });
							this.api.getMesVents(this.state.client).then(res => {
								if (res.data.success) {
									this.setState({ commandes: res.data.commandes });
									console.log(this.state);
								} else {
									alert(res.data.message);
								}
							});
						} else {
							localStorage.clear();
							window.location = "/clientLogin";
						}
                    });
                    */

					this.api.getMesVentes(this.state.entreprise).then(res => {
						if (res.data.success) {
							console.log(res.data);
							this.setState({ mesVentes: res.data.mesVentes });
						} else {
							alert(res.data.message);
						}
					});
				} else {
					localStorage.clear();
					window.location = "/clientLogin";
				}
			}
		);
	}

	render() {
		let mesVentes = this.state.mesVentes.map((vente, index) => {
			return (
				<div>
					{vente.nom} {vente.prix}$ {vente.description}
				</div>
			);
		});
		return <div style={{ marginTop: "100px" }}>{mesVentes}</div>;
	}
}
