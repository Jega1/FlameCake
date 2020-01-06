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
	Col,
	Form,
	FormGroup,
	Input,
	Label
} from "reactstrap";

import Api from "../Services/Api";

export default class Nav extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			...this.props,
			file: null,
			modalOpenModif: false
		};
	}

	toggleModalModif = () =>
		this.setState({
			modalOpenModif: !this.state.modalOpenModif
		});

	updateAnnonce = () => {
		const formData = new FormData();
		formData.append("myImage", this.state.file);
		// d'abord on upload le fichier, ensuite on prend l'url et on le passe à publierAnnonce
		if (this.state.file) {
			this.api.uploadFile(formData).then(res => {
				if (res.data.success) {
					let url = res.data.url;
					// si tout c'est bien passé, on publie l'annonce et on passe l'URL de l'image à publierAnnonce
					this.api.updateAnnonce(this.state, url).then(res => {
						this.props.getAnnonces();
						this.toggleModalModif();
					});
				} else {
					alert("Erreur lors de l'upload de l'image");
				}
			});
		} else {
			this.api.updateAnnonce(this.state, null).then(res => {
				console.log(res.data);
			});
		}
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

	render() {
		return (
			<div>
				<Button color="primary" onClick={this.toggleModalModif}>
					Modifier
				</Button>
				{/* start modal modifier les annonce*/}
				<Modal
					isOpen={this.state.modalOpenModif}
					toggle={this.toggleModalModif}
				>
					<ModalHeader toggle={this.toggleModalModif}>
						Modifier l'annonce
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
									value={this.state.nom}
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
						<Button color="primary" onClick={this.updateAnnonce}>
							Update
						</Button>{" "}
						<Button color="secondary" onClick={this.toggleModalModif}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
