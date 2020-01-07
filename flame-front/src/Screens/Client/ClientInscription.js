import React, { Component } from "react";
import { Col, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import Button from "@material-ui/core/Button";

import Api from "../../Services/Api";

export default class ClientInscription extends Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "" };

		this.state = {
			nom: null,
			prenom: null,
			adresse: null,
			email: null,
			password: null,
			ville: null,
			date: new Date(),
			loading: false,
			message: null
		};

		this.api = new Api();
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	registerClient = event => {
		event.preventDefault();
		this.setState({ loading: true });

		this.api.registerClient(this.state).then(res => {
			console.log(res.data);
			this.setState({ loading: false, message: res.data.message });
		});
	};

	render() {
		return (
			<div
				style={{
					backgroundColor: "whitesmoke",
					width: "80%",
					margin: "auto",
					padding: " 4rem"
				}}
			>
				<h4 style={{ textAlign: "center" }}>
					Inscrivez -vous
				</h4>

				<Form style={{ backgroundColor: "" }}>
					<FormGroup row>
						<Label sm={2}>Nom</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="text"
								value={this.state.nom}
								name="nom"
								placeholder="Nom"
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>Prenom</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="text"
								value={this.state.prenom}
								name="prenom"
								placeholder="Prenom"
							/>
						</Col>
					</FormGroup>
					<FormGroup row>
						<Label sm={2}>Adresse</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="text"
								value={this.state.poste}
								name="adresse"
								placeholder="Adresse"
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>Ville</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="text"
								value={this.state.ville}
								name="ville"
								placeholder="Ville"
							/>
						</Col>
					</FormGroup>

					<FormGroup row style={{}}>
						<Label sm={2}>Email</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="email"
								value={this.state.email}
								name="email"
								placeholder="Email"
							/>
						</Col>
					</FormGroup>

					<FormGroup row>
						<Label sm={2}>Mot de passe</Label>
						<Col sm={8}>
							<Input
								onChange={this.handleInputChange}
								type="password"
								value={this.state.password}
								name="password"
								placeholder="Mot de passe"
							/>
						</Col>
					</FormGroup>

					<FormGroup check row>
						<Col sm={{ size: 8, offset: 4 }}>
							<Button
								variant="contained"
								color="primary"
								width="30%"
								type="submit"
								onClick={this.registerClient}
								disabled={this.state.loading}
							>
								Submit
							</Button>
						</Col>
					</FormGroup>
					{this.state.message ? (
						<Alert color="success">{this.state.message}</Alert>
					) : null}
				</Form>
			</div>




			
		);
	}
}
