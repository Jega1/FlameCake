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
import Logo from "../Components/Logo";
import Api from "../Services/Api";
import Panier from "../Components/Panier";

export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			open: false,
			openDetails: false,
			openPanier: false,
			user: this.props.user,
			entreprise: this.props.entreprise
		};
		console.log(this.state);
	}

	toggle = () => {
		this.setState({ open: !this.state.open });
	};

	toggleDetails = () => {
		this.setState({ openDetails: !this.state.openDetails });
	};

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};

	reloadPanier = () => {
		this.refs.panier.reloadPanier();
	}

	render() {
		return (
			<div className="menu-div">
				<nav
					id="menu"
					className="navbar navbar-expand-lg navbar-dark fixed-top "
				>
					<Link to="/" className="navbar-brand">
						<Logo height="70px" />
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
									Home
								</Link>
							</li>
							<li class="nav-item">
								<Link className="nav-link" to="/about">
									Entreprise
								</Link>
							</li>{" "}
							<li class="nav-item">
								<Link className="nav-link" to="/contact">
									contact
								</Link>
							</li>{" "}
							{/* pour ????? */}
							<li class="nav-item">
								{this.state.user || this.state.entreprise ? (
									<Dropdown
										isOpen={this.state.openDetails}
										toggle={this.toggleDetails}
									>
										<DropdownToggle caret>
											{this.state.user && this.state.user.email}
											{this.state.entreprise && this.state.entreprise.email}
										</DropdownToggle>

										{/* pour redireger vers mes commande ou mes ventes */}
										<DropdownMenu right>
											{this.state.user ? (
												<DropdownItem
													onClick={() => (window.location = "/mesCommandes")}
												>
													Mes commandes
												</DropdownItem>
											) : (
												<DropdownItem
													onClick={() => (window.location = "/mesVentes")}
												>
													Mes ventes
												</DropdownItem>
											)}

											{/* pour redireger vers clientDashboard ou entrepriseDashboard */}
											{this.state.user ? (
												<DropdownItem
													onClick={() => (window.location = "/clientDashboard")}
												>
													Mon compte
												</DropdownItem>
											) : (
												<DropdownItem
													onClick={() =>
														(window.location = "/enterpriseDashboard")
													}
												>
													Mon compte
												</DropdownItem>
											)}

											{/* pour le connexion ou deconnection clientDashboard ou entrepriseDashboard */}

											<DropdownItem onClick={this.logout}>
												Se déconnecter
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
								) : (
									<Dropdown isOpen={this.state.open} toggle={this.toggle}>
										<DropdownToggle caret>Connexion</DropdownToggle>
										<DropdownMenu right>
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
							{/* Start panier button and badge */}
							{this.state.user && <Panier ref="panier" />}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}
