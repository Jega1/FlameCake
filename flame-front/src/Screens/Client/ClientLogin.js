import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Container,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from "reactstrap";
import Api from "../../Services/Api";

export default class ClientLogin extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
	}
	state = {
		email: null,
		password: null
	};

	componentDidMount() {
		let token = localStorage.getItem("tokenClient");
		let c = localStorage.getItem("client");

		if (token && c) {
			// si le token est présent dans le localstorage, il faut en plus vérifier si ce token est valide
			// on l'envoie à nodejs, nodejs le déchiffre avec le secret key et vérifie si ce token correspond à un user id
			this.api.checkToken(token).then(res => {
				if (res.data.success) {
					window.location = "/clientDashboard";
				}
			});
		}
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	clientLogin = () => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValidEmail = re.test(this.state.email.toLowerCase());
		if (!isValidEmail) {
			alert("Email invalide");
			return;
		}

		this.api.clientLogin(this.state.email, this.state.password).then(res => {
			console.log(res.data);
			if (res.data.success === true) {
				localStorage.setItem("client", JSON.stringify(res.data.client));
				localStorage.setItem("tokenClient", res.data.tokenClient);
				window.location = "/ClientDashboard";
			} else {
				alert(res.data.message);
			}
		});
	};

	render() {
		return (
			<Container
				style={{
					backgroundColor: "whitesmoke",
					width: "80%",
					margin: "auto",
					padding: " 4rem"
				}}
			>
				<h2 style={{ textAlign: "center" }}>Sign In</h2>
				<Form className="form">
					<Col>
						<FormGroup>
							<Label>Email</Label>
							<Input
								type="email"
								name="email"
								placeholder="myemail@email.com"
								value={this.state.email}
								onChange={this.handleInputChange}
							/>
						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="examplePassword">Password</Label>
							<Input
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.handleInputChange}
								placeholder="********"
							/>
						</FormGroup>
					</Col>
					<div>
						<Button sm={{ size: 8, offset: 4 }} onClick={this.clientLogin}>
							Submit
						</Button>

						<Link className="" to="/inscription">
							Créer un compte
						</Link>
					</div>
				</Form>
			</Container>
		);
	}
}
