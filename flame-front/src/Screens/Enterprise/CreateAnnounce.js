import React, { Component } from "react";
import {
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Alert,
	Container
} from "reactstrap";
import Nav from "../../Components/Nav";

import Api from "../../Services/Api";
//import { Container } from "@material-ui/core";

export default class CreateAnnounce extends Component {
	constructor(props) {
		super(props);
		this.state = { apiResponse: "" };

		this.state = {
			poste: null,
			contrat: null,
			ville: null,
			discription: null,
			date: new Date(),
			dateCreation: {
				type: Date,
				default: new Date()
			},
			loading: false,
			message: null
		};

		this.api = new Api();
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	registerAnnounce = event => {
		event.preventDefault();
		this.setState({ loading: true });

		this.api.registerAnnounce(this.state).then(res => {
			console.log(res.data);
			this.setState({ loading: false, message: res.data.message });
		});
	};

	render() {
		return (
			<div>
				<Nav />
				<Container
					style={{
						backgroundColor: "whitesmoke",
						width: "80%",
						margin: "auto",
						padding: " 4rem"
					}}
				>
					<h4 style={{ textAlign: "center" }}>Create a annonce</h4>

					<Form style={{ backgroundColor: "" }}>
						<FormGroup row>
							<Label sm={2}>Poste</Label>
							<Col sm={8}>
								<Input
									onChange={this.handleInputChange}
									type="text"
									value={this.state.poste}
									name="poste"
									placeholder="Poste"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>Contrat</Label>
							<Col sm={8}>
								<Input
									onChange={this.handleInputChange}
									type="text"
									value={this.state.contrat}
									name="contrat"
									placeholder="contrat"
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

						<FormGroup row>
							<Label sm={2}>Description</Label>
							<Col sm={8}>
								<Input
									onChange={this.handleInputChange}
									type="text"
									value={this.state.description}
									name="description"
									placeholder="description"
								/>
							</Col>
						</FormGroup>

						<FormGroup check row>
							<Col sm={{ size: 8, offset: 4 }}>
								<Button
									type="submit"
									onClick={this.registerAnnounce}
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
				</Container>
			</div>
		);
	}
}
