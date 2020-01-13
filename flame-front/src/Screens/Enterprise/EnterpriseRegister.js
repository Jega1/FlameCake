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
import Footer from "../../Components/Footer";
import Api from "../../Services/Api";

export default class EnterpriseRegister extends Component {
	constructor(props) {
		super(props);

		this.state = { apiResponse: "" };

		this.state = {
			nom: null,
			ref: null,
			lieu: null,
			email: null,
			password: null,
			date: new Date(),
			loading: false,
			message: null
		};

		this.api = new Api();
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	registerEnterprise = event => {
		event.preventDefault();
		this.setState({ loading: true });

		this.api.registerEnterprise(this.state).then(res => {
			console.log(res.data);

			this.setState({
				loading: false,
				message: res.data.message + ". Redirection dans 3 secondes."
			});
			if (res.data.success) {
				setTimeout(() => {
					window.location = "/EntrepriseLogin";
				}, 3000);
			}
		});
	};

	render() {
		return (
			<div>
				<Container
					style={{
						backgroundColor: "whitesmoke",
						width: "80%",
						margin: "auto",
						padding: " 4rem"
					}}
				>
					<h3 style={{ textAlign: "center" }}>Trouvez tous les gateaux !</h3>

					<Form style={{ backgroundColor: "" }}>
						<FormGroup row>
							<Label sm={2}>Nom</Label>
							<Col sm={8}>
								<Input
									onChange={this.handleInputChange}
									type="text"
									value={this.state.nom}
									name="nom"
									placeholder="Nom d'entreprise"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>Reference</Label>
							<Col sm={8}>
								<Input
									onChange={this.handleInputChange}
									type="text"
									value={this.state.ref}
									name="ref"
									placeholder="Numero de reference"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
							<Label sm={2}>Lieu d'entreprise</Label>
							<Col sm={8}>
								<Input
									onChange={this.handleInputChange}
									type="text"
									value={this.state.lieu}
									name="lieu"
									placeholder="lieu d'entreprise"
								/>
							</Col>
						</FormGroup>
						<FormGroup row>
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
							<Label sm={2}>password</Label>
							<Col sm={8}>
								<Input
									onChange={this.handleInputChange}
									type="password"
									value={this.state.password}
									name="password"
									placeholder="password"
								/>
							</Col>
						</FormGroup>

						<FormGroup check row>
							<Col sm={{ size: 8, offset: 4 }}>
								<Button
									type="submit"
									onClick={this.registerEnterprise}
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
				<Footer/>
			</div>
		);
	}
}
