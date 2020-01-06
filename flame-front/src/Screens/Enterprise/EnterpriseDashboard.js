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

	// onFile = event => {
	// 	//console.log(event.target.files[0]);
	// 	this.setState({
	// 		file: event.target.files[0]
	// 	});
	// };

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
						console.log(res.data);
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
				<Col md="4">
					<Card key={index}>
						<CardImg
							top
							width="100%"
							src={annonce.photo}
							alt="Card image cap"
						/>
						<CardBody>
							<CardTitle>{annonce.nom}</CardTitle>
							<CardSubtitle>{annonce.categorie}</CardSubtitle>
							<CardText>{annonce.prix}</CardText>
							<CardText>{annonce.description}</CardText>
							<ModifAnnonce {...annonce} getAnnonces={this.getAnnonces} />
							<Button
								color="danger"
								onClick={() => this.deleteAnnonce(annonce._id)}
							>
								Supprimer
							</Button>
						</CardBody>
					</Card>
				</Col>
			);
		});
		return (
			<div>
				<h2> Bienvenue sur votre espace </h2>
				{this.state.enterprise ? this.state.enterprise.nom : null}
				<Button color="primary" onClick={this.toggleModal}>
					Ajouter
				</Button>
				<Container>
					<Row>{mesAnnonces}</Row>
				</Container>
				{/* start modal form to publier le announce*/}
				<Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
					<ModalHeader toggle={this.toggleModal}>
						Ajouter le produits
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
								<Input type="select" name="taille">
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
									//onChange={this.onFile}
									// value={this.state.file}
								/>
							</FormGroup>
						</Form>
					</ModalBody>
					<ModalFooter>
						<Button
							color="primary"
							onClick={this.publierAnnonce}
							disabled={this.state.loading}
						>
							Ajouter
						</Button>{" "}
						<Button color="secondary" onClick={this.toggleModal}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
