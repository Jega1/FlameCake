import React, { Component } from "react";
import { Link } from "react-router-dom";
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

export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			open: false,
			openDetails: false,
			openPanier: false,
			user: this.props.user,
			panier: this.props.panier
		};
		console.log(this.state);
	}
	componentWillMount() {
		console.log("NAV rendered");
	}

	toggle = () => {
		this.setState({ open: !this.state.open });
	};

	toggleDetails = () => {
		this.setState({ openDetails: !this.state.openDetails });
	};

	togglePanier = () => {
		this.setState({
			openPanier: !this.state.openPanier
		});
	};

	commander = () => {
		this.api.commander(this.state.panier, this.state.user).then(res => {
			if (res.data.success) {
				localStorage.removeItem("panier");
				alert("Votre commande a bien été prise en compte :)");
				window.location.reload();
			}
		});
	};

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};

	render() {
		return (
			<div className="menu-div">
				<nav id="menu" className="navbar navbar-expand-lg navbar-dark ">
					<Link to="/" className="navbar-brand">
						<i class="fas fa-home">LOGO</i>
						<img src="" />
					</Link>
					<button
						class="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarNavDropdown">
						<ul
							class="collapse navbar-collapse flex-grow-1 text-right"
							id="myNavbar"
							class="navbar-nav ml-auto flex-nowrap"
						>
							<li class="nav-item active">
								<Link className="nav-link" to="/">
									<i class="fas fa-home"></i>
									Homeqqq
								</Link>
							</li>
							<li class="nav-item">
								<Link className="nav-link" to="/about">
									About us
								</Link>
							</li>{" "}
							<li class="nav-item">
								<Link className="nav-link" to="/about">
									contact
								</Link>
							</li>{" "}
							<li class="nav-item">
								{this.state.user ? (
									<Dropdown
										isOpen={this.state.openDetails}
										toggle={this.toggleDetails}
									>
										<DropdownToggle caret>{this.state.user.nom}</DropdownToggle>
										<DropdownMenu>
											<DropdownItem
												onClick={() => (window.location = "/clientDashboard")}
											>
												Mon compte
											</DropdownItem>
											<DropdownItem
												onClick={()=>(window.location = "/mesCommandes")}
											>
												Mes commandes
											</DropdownItem>
											<DropdownItem onClick={this.logout}>
												Se déconnecter
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								) : (
									<Dropdown isOpen={this.state.open} toggle={this.toggle}>
										<DropdownToggle caret>Connexion</DropdownToggle>
										<DropdownMenu>
											<Link to="/ClientLogin">
												<DropdownItem>Client</DropdownItem>
											</Link>

											<Link to="/EntrepriseLogin">
												<DropdownItem>Entreprise</DropdownItem>
											</Link>
										</DropdownMenu>
									</Dropdown>
								)}
							</li>
							{this.state.user && this.state.panier ? (
								<span>
									<Button color="success" outline onClick={this.togglePanier}>
										Panier{" "}
										<Badge color="secondary">{this.state.panier.length}</Badge>
									</Button>
									<Modal
										isOpen={this.state.openPanier}
										toggle={this.togglePanier}
									>
										<ModalHeader toggle={this.togglePanier}>
											Mon panier
										</ModalHeader>
										<ModalBody>
											<ListGroup>
												{this.state.panier.map((article, index) => {
													return (
														<ListGroupItem className="justify-content-between">
															{article.nom} <Badge pill>{article.prix} $</Badge>
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
												$
											</h1>
											<Button color="primary" onClick={this.commander}>
												Commander
											</Button>{" "}
											<Button color="secondary" onClick={this.togglePanier}>
												Annuler
											</Button>
										</ModalFooter>
									</Modal>
								</span>
							) : null}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}
