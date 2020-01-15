import React, { Component } from "react";
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Button,
	ListGroup,
	ListGroupItem,
	Badge,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Container,
	Row,
	Col
} from "reactstrap";

import Api from "../Services/Api";

export default class Panier extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			panier: [],
			client: {}
		};
	}

	componentDidMount() {
		let panier = JSON.parse(localStorage.getItem("panier"));
		let client = localStorage.getItem("client");

		if (client) {
			this.setState({ client: JSON.parse(client) });
		}
		if (panier) {
			this.setState({ panier: panier });
		}
	}

	togglePanier = () => {
		this.setState({
			openPanier: !this.state.openPanier
		});
	};

	commander = () => {
		if (this.state.panier.length > 0) {
			this.api.commander(this.state.panier, this.state.client).then(res => {
				if (res.data.success) {
					localStorage.removeItem("panier");
					alert("Votre commande a bien été prise en compte :)");
					window.location.reload();
				}
			});
		} else {
			alert("Le panier est vide...");
		}
	};

	///
	reloadPanier = () => {
		let panier = JSON.parse(localStorage.getItem("panier"));
		this.setState({ panier: panier });
	};

	deleteItemPanier = index => {
		let panier = JSON.parse(localStorage.getItem("panier"));
		panier.splice(index, 1);
		console.log(panier);
		localStorage.setItem("panier", JSON.stringify(panier));
		this.setState({ panier: panier });
	};
	render() {
		return (
			<div>
				<Button color="success" outline onClick={this.togglePanier}>
					Panier <Badge color="secondary">{this.state.panier.length}</Badge>
				</Button>

				<Modal
					style={{ width: "100%" }}
					isOpen={this.state.openPanier}
					toggle={this.togglePanier}
				>
					<ModalHeader
						toggle={this.togglePanier}
						style={{ width: "100%", backgroundColor: "#f59432" }}
					>
						Mon panier
					</ModalHeader>
					<ModalBody style={{ width: "100%" }}>
						<ListGroup>
							{this.state.panier.map((article, index) => {
								return (
									<ListGroupItem
									
										style={{ fontSize: "1.5rem", width: "100%" }}
									>
										{article.nom}{" "}{" "}<Badge pill style={{ backgroundColor: "#f59432" }}>{article.prix} €</Badge>
										{" "}{"  "}{" "}{" "}{" "}{" "}
										<Button
											color="danger"
											onClick={() => this.deleteItemPanier(index)}
										>
											<i className="fas fa-trash-alt" style={{}}></i>
										</Button>
									</ListGroupItem>
								);
							})}
						</ListGroup>
					</ModalBody>
					<ModalFooter>
						<h1>
							Total:
							{this.state.panier.reduce(
								(acc, current) => acc + current.prix,
								0
							)}{" "}
							€
						</h1>
						<Button color="primary" onClick={this.commander}>
							Commander
						</Button>{" "}
						<Button color="secondary" onClick={this.togglePanier}>
							Fermer
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
