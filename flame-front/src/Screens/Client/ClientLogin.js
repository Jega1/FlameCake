import React, { Component } from "react";
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";

import {
	Container,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button
} from "reactstrap";
import Carousel from "../../Components/Carousel";
import Footer from "../../Components/Footer";
import Api from "../../Services/Api";

export default class ClientLogin extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
	}
	state = {
		email: "",
		password: ""
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
		if (!(this.state.email.length > 0 && this.state.password.length > 0)) {
			alert("Reneignez tous les champs");
			return;
		}

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
			<div>
				<Carousel />
				<Container
					style={{
						backgroundColor: "",
						width: "100%",
						height: "50vh",
						margin: "auto",
						padding: "4rem"
					}}
				>
					<h2 style={{ textAlign: "center" }}>Sign In</h2>
					<Form
						className="form"
						// style={{
						// 	background: "whitesmoke",
						// 	width: "100%",
						// 	margin: "auto",
						// 	padding: "1rem"
						// }}
					>
						<Col>
							<FormGroup>
								<Label style={{ fontSize: "1.5rem" }}>Email</Label>
								<Input
									type="email"
									name="email"
									placeholder="myemail@email.com"
									value={this.state.email}
									onChange={this.handleInputChange}
									style={{ fontSize: "1.5rem" }}
									required
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label style={{ fontSize: "1.5rem" }}>Password</Label>
								<Input
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleInputChange}
									style={{ fontSize: "1.5rem" }}
									required
								/>
							</FormGroup>
						</Col>
						<div style={{ display: "flex", justifyContent: "space-around" }}>
							<div>
								<Button
									width="50%"
									color="primary"
									style={{ padding: ".7rem 3rem", fontSize: "1rem" }}
									onClick={this.clientLogin}
								>
									Submit
								</Button>
							</div>
							<div>
								<Link
									className=""
									style={{ fontSize: "1.6rem" }}
									to="/inscription"
								>
									Créer un compte
								</Link>
							</div>
						</div>
					</Form>
				</Container>
				<Footer />
			</div>
		);
	}
}
