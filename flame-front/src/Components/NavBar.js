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
	}
	state = {
		open: false,
		openDetails: false,
		openPanier: false,
		user: this.props.user,
		panier: this.props.panier
	};

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
				alert(res.data.message);
			}
		});
	};

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};

	render() {
		return (
			<nav class="menu">
				<h1 class="menu__logo">Smart job</h1>

				<div className="menu__right">
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

					<ul class="menu__list">
						<li class="menu__list-item">
							<Link className="menu__link menu__link--active" to="/">
								Home
							</Link>
						</li>

						<li class="menu__list-item">
							<Link className="menu__link" to="/about">
								contact
							</Link>
						</li>

						<li class="menu__list-item">
							{this.state.user ? (
								<Dropdown
									isOpen={this.state.openDetails}
									toggle={this.toggleDetails}
								>
									<DropdownToggle caret>{this.state.user.email}</DropdownToggle>
									<DropdownMenu>
										<DropdownItem onClick={this.monCompte}>
											{" "}
											Mon compte
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
		);
				}
			}















































// import React, { Component } from "react";
//  import { Link } from "react-router-dom";


// export default class NavBar extends Component {
// 	render() {
// 		return (
// 			<nav id="menu" className="navbar navbar-expand-lg navbar-dark ">
// 				<Link to="/" className="navbar-brand">
// 					<i class="fas fa-home"></i>
// 				</Link>

// 				<button
// 					class="navbar-toggler"
// 					type="button"
// 					data-toggle="collapse"
// 					data-target="#navbarNavDropdown"
// 					aria-controls="navbarNavDropdown"
// 					aria-expanded="false"
// 					aria-label="Toggle navigation"
// 				>
// 					<span class="navbar-toggler-icon"></span>
// 				</button>

// 				<div class="collapse navbar-collapse" id="navbarNavDropdown">
// 					<ul class="navbar-nav">
// 						<li class="nav-item">
// 							<Link to="/" className="nav-link">
// 								Home
// 							</Link>
// 						</li>
// 						<li class="nav-item">
// 							<Link className="nav-link" to=" ">
// 								contact
// 							</Link>
// 						</li>

// 						{/* <li class="nav-item dropdown">
// 							<a
// 								class="nav-link dropdown-toggle"
// 								href="#"
// 								id="navbarDropdownMenuLink"
// 								data-toggle="dropdown"
// 								aria-haspopup="true"
// 								aria-expanded="false"
// 							>
// 								Dashboard
// 							</a>
// 							<div
// 								class="dropdown-menu"
// 								aria-labelledby="navbarDropdownMenuLink"
// 							>
// 								<Link to="/AddPhone" class="dropdown-item">
// 									Ajouter produit
// 								</Link>
// 								<Link to="/AllPhone" class="dropdown-item">
// 									List de produit
// 								</Link>
// 								<Link to="/Edit" class="dropdown-item">
// 									Change produit
// 								</Link>
// 							</div>
// 						</li> */}
// 					</ul>

// 					<ul
// 						class="collapse navbar-collapse flex-grow-1 text-right"
// 						id="myNavbar"
// 						class="navbar-nav ml-auto flex-nowrap"
// 					>
// 						<li className="nav-item">
// 							<Link className="nav-link m-2 menu-item" to="/about">
// 								Accès recruter
// 							</Link>
// 						</li>
// 						<li className="nav-item">
// 							<Link className="nav-link m-2 menu-item" to="/about">
// 								Accès recruter
// 							</Link>
// 						</li>
// 						<li className="nav-item">
// 							<Link className="nav-link m-2 menu-item" to="/about">
// 								Accès recruter
// 							</Link>
// 						</li>

// 						<li class="nav-item dropdown">
// 							<a
// 								class="nav-link dropdown-toggle"
// 								href="#"
// 								id="navbarDropdownMenuLink"
// 								data-toggle="dropdown"
// 								aria-haspopup="true"
// 								aria-expanded="false"
// 							>
// 								Dashboard
// 							</a>
// 							<div
// 								class="dropdown-menu"
// 								aria-labelledby="navbarDropdownMenuLink"
// 							>
// 								<Link to="/AddPhone" class="dropdown-item">
// 									Ajouter produit
// 								</Link>
// 								<Link to="/AllPhone" class="dropdown-item">
// 									List de produit
// 								</Link>
// 								<Link to="/Edit" class="dropdown-item">
// 									Change produit
// 								</Link>
// 							</div>
// 						</li>

// 						{/* <li class="nav-item">
// 							<Link to="/Basket" class="nav-link m-2 menu-item nav-active">
// 								<i class="fas fa-shopping-basket"></i>
// 							</Link>
// 						</li> */}
// 					</ul>
// 				</div>
// 			</nav>
// 		);
// 	}
// }

