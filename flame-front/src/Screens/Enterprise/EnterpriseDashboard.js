import React, { Component } from "react";

import { Link } from "react-router-dom";

import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col
} from "reactstrap";
import ModifAnnonce from "../../Components/ModifAnnonce";
import Footer from "../../Components/Footer";
import Api from "../../Services/Api";

export default class EnterpriseDashboard extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			loading: false,
			enterprise: {},
			modalOpen: false,
			modalOpenModif: false,
			nom: null,
			categorie: "mariage",
			quantite: 1,
			prix: null,
			taille: "petite",
			description: "",
			file: null,
			mesAnnonces: [],
			modifAnnounce: null,
			modifAnnounce: this.props.modifAnnounce
		};
	}
	componentDidMount() {
		let token = localStorage.getItem("tokenEnterprise");
		let enterp = localStorage.getItem("enterprise");

		if (!token || !enterp) {
			window.location = "/EnterpriseLogin";
			return;
		}

		this.setState({ enterprise: JSON.parse(enterp) }, () => {
			this.getAnnonces();
		});
		console.log(this.state);
	}

	getAnnonces = () => {
		this.api.getAnnonces(this.state.enterprise).then(res => {
			console.log(res.data);
			if (res.data.success) {
				this.setState({ mesAnnonces: res.data.mesAnnonces });
			}
		});
	};

	logout = () => {
		localStorage.clear();
		window.location = "/";
	};

	handleInputChange = event => {
		// this.setState({ [event.target.name]: event.target.value });
		this.setState({ [event.target.name]: event.target.value });
	};

	handleImageChange = event => {
		// this.setState({ [event.target.name]: event.target.value });
		console.log(event.target.files[0]);
		this.setState({ file: event.target.files[0] });
	};

	handleSelectQuantite = event => {
		this.setState({ quantite: event.target.value });
	};

	handleSelectTaille = event => {
		this.setState({ taille: event.target.value });
	};

	handleSelectCategorie = event => {
		this.setState({ categorie: event.target.value });
	};

	toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

	publierAnnonce = () => {
		this.setState({ loading: true });
		const formData = new FormData();
		formData.append("myImage", this.state.file);
		// d'abord on upload le fichier, ensuite on prend l'url et on le passe à publierAnnonce
		if (this.state.file) {
			this.api.uploadFile(formData).then(res => {
				if (res.data.success) {
					let url = res.data.url;
					// si tout c'est bien passé, on publie l'annonce et on passe l'URL de l'image à publierAnnonce
					this.api.publierAnnonce(this.state, url).then(res => {
						this.getAnnonces();
					});
				} else {
					alert("Erreur lors de l'upload de l'image");
				}
				this.setState({ loading: false, modalOpen: false });
			});
		} else {
			this.api.publierAnnonce(this.state, null).then(res => {
				console.log(res.data);
				this.setState({ loading: false, modalOpen: false });
				this.getAnnonces();
			});
		}
	};

	deleteAnnonce = id => {
		this.api.deleteAnnonce(id).then(res => {
			if (res.data.success) {
				alert(res.data.message);
				// on rafraichit les annonces
				this.api.getAnnonces(this.state.enterprise).then(res => {
					console.log(res.data);
					if (res.data.success) {
						this.setState({
							mesAnnonces: res.data.mesAnnonces
						});
					}
				});
			} else {
				alert("Une erreur est survenue");
			}
		});
	};

	render() {
		let mesAnnonces = this.state.mesAnnonces.map((annonce, index) => {
			return (
				<Col md="4" style={{ paddingTop: "5rem" }}>
					<Card
						key={index}
						style={{
							backgrounColor: "whitesmoke",
							boxShadow: "0px 20px 25px rgba(0, 0, 0, 0.42)"
						}}
					>
						{annonce.photo ? (
							<CardImg
								top
								width="100%"
								height="300px"
								src={annonce.photo}
								alt="Card image cap"
							/>
						) : null}

						<CardBody style={{  }}>
							<CardTitle style={{ fontSize: "1.5rem", color: "#f59432"}}>
								Nom de gateau{" : "}
								{annonce.nom}
							</CardTitle>
							<CardSubtitle style={{ fontSize: "1.5rem" }}>
								Catégorie{" : "}
								{annonce.categorie}
							</CardSubtitle>
							<CardSubtitle style={{ fontSize: "1.5rem" }}>
								Taille{" : "}
								{annonce.taille}
							</CardSubtitle>
							<CardSubtitle style={{ fontSize: "1.5rem" }}>
								Quantité{" : "}
								{annonce.quantite}
							</CardSubtitle>
							<CardText style={{ fontSize: "1.5rem", color: "green" }}>
								Prix{" : "}
								{annonce.prix}
							</CardText>
							<CardText style={{ fontSize: "1.5rem" }}>
								Déscription{" : "}
								{annonce.description}
							</CardText>

							<div style={{ display: "flex", justifyContent: "space-around" }}>
								<ModifAnnonce {...annonce} getAnnonces={this.getAnnonces} />
								<Button
									color="danger"
									onClick={() => this.deleteAnnonce(annonce._id)}
									style={{ padding: "1rem 2rem" }}
								>
									Supprimer
								</Button>
							</div>
						</CardBody>
					</Card>
				</Col>
			);
		});
		return (
			<div>
				<h2 style={{ textAlign: "center", margin: "2rem", paddingTop: "3rem" }}>
					{" "}
					{this.state.enterprise ? this.state.enterprise.nom : null} Bienvenue
					sur votre espace
					<Button
						color="primary"
						onClick={this.toggleModal}
						style={{
							textAlign: "center",
							margin: "3rem",
							padding: "1rem 3rem",
							fontSize: "1.5rem"
						}}
					>
						Ajouter vos produits
					</Button>{" "}
				</h2>
				<Container>
					<Row>{mesAnnonces}</Row>
				</Container>
				{/* start modal form to publier le announce*/}
				<Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						Ajouter le produit
					</ModalHeader>
					<ModalBody>
						<Form>
							<FormGroup>
								<Label>Nom du produit</Label>
								<Input
									type="text"
									name="nom"
									placeholder="Le nom du produit"
									onChange={this.handleInputChange}
									value={this.state.produit}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Catégorie</Label>
								<Input
									type="select"
									name="categorie"
									onChange={this.handleSelectCategorie}
									value={this.state.categorie}
								>
									<option value="mariage">Gateau mariage</option>
									<option value="fete">Gateau fête</option>
									<option value="anniversaire">Gateau d'anniversaire</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Label>Quantité</Label>
								<Input
									type="select"
									name="quantite"
									onChange={this.handleSelectQuantite}
									value={this.state.quantite}
								>
									<option value="1">1</option>
									<option value="2">2</option>
									<option value="3">3</option>
									<option value="4">4</option>
									<option value="5">5</option>
								</Input>
							</FormGroup>
							<FormGroup>
								<Label>Prix unitaire</Label>
								<Input
									type="number"
									name="prix"
									placeholder="Prix du produit"
									value={this.state.prix}
									onChange={this.handleInputChange}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Taille</Label>
								<Input
									type="select"
									name="taille"
									onChange={this.handleSelectTaille}
								>
									<option>Petite</option>
									<option>Moyenne</option>
									<option>Grande</option>
								</Input>
							</FormGroup>

							<FormGroup>
								<Label>Description du gâteau</Label>
								<Input
									type="textarea"
									name="description"
									onChange={this.handleInputChange}
									value={this.state.description}
								/>
							</FormGroup>

							<FormGroup>
								<Label>Image</Label>
								<Input
									type="file"
									name="file"
									onChange={this.handleImageChange}
								/>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter style={{ display: "flex" }}>
						<Button
							color="primary"
							onClick={this.publierAnnonce}
							disabled={this.state.loading}
						>
							Ajouter
						</Button>
						<Button color="secondary" onClick={this.toggleModal}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
				<Footer />
			</div>
		);
	}
}
