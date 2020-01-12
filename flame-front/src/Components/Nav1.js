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

export default class Nav1 extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			open: false,
			openDetails: false,
			openPanier: false,
			user: this.props.user,
			entreprise: this.props.entreprise,
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
			<span class="navbar-toggler-icon leftmenutrigger"></span>
				{/* <nav id="menu" className="navbar navbar-expand-lg navbar-dark "> */}
				<nav id="menu" className="navbar header-top fixed-top navbar-expand-lg  navbar-dark bg-dark ">
					<Link to="/" className="navbar-brand">
						{/* <Logo/> */}
					</Link>
					{/* <button
						class="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button> */}

					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarResponsive">
					{/* <div class="collapse navbar-collapse" id="navbarNavDropdown"> */}
						<ul
							class=""
							id=""
							class="navbar-nav ml-auto"
						>
							<li class="nav-item active">
								<Link className="nav-link" to="/">
									<i class="fas fa-home"></i>
									Home
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
								{this.state.user || this.state.entreprise ? (
									<Dropdown
										isOpen={this.state.openDetails}
										toggle={this.toggleDetails}
									>
										<DropdownToggle caret>
											{this.state.user && this.state.user.email}
											{this.state.entreprise && this.state.entreprise.email}
										</DropdownToggle>
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
											<DropdownItem
												onClick={() => (window.location = "/clientDashboard")}
											>
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
							{this.state.user && this.state.panier ? (
								<span>
									<Button color="success" outline onClick={this.togglePanier}>
										Panier{" "}
										<Badge color="secondary">{this.state.panier.length}</Badge>
									</Button>

									{/* open commande validation modal dans le menu */}
									<Modal
										style={{ width: "100%" }}
										isOpen={this.state.openPanier}
										toggle={this.togglePanier}
									>
										<ModalHeader
											toggle={this.togglePanier}
											style={{ width: "100%", background: "green" }}
										>
											Mon panier
										</ModalHeader>
										<ModalBody style={{ width: "100%" }}>
											<ListGroup>
												{this.state.panier.map((article, index) => {
													return (
														<ListGroupItem
															className="justify-content-space-between"
															style={{ fontSize: "1.5rem", width: "100%" }}
														>
															{article.nom} <Badge pill>{article.prix} $</Badge>
															<i className="fas fa-trash-alt" style={{}}></i>
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
									{/* End model validation commandes */}
								</span>
							) : null}
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}

// <div class="topnav" id="myTopnav">
// 	<a href="#home" class="active">Home</a>
// 	<a href="#news">News</a>
// 	<a href="#contact">Contact</a>
// 	<a href="#about">About</a>
// 	<a href="javascript:void(0);" class="icon" onclick="myFunction()">
// 		<i class="fa fa-bars"></i>
// 	</a>
// </div>
