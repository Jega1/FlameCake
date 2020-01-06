import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	Container,
	Col,
	Form,
	FormGroup,
	Label,
	Input,
	Button,
	Alert
} from "reactstrap";
import Nav from "../../Components/Nav";
import NavBar from "../../Components/NavBar";
import Api from "../../Services/Api";

export default class EnterpriseLogin extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
	}

	state = {
		email: null,
		password: null
	};

	componentDidMount() {
		// on vérifie le token

		let token = localStorage.getItem("tokenEnterprise");
		if (token) {
			// si le token existe dans le localstorage
			// TODO vérifier avec la bdd
			//window.location = "/EnterpriseDashboard";
		}
	}

	handleInputChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	enterpriseLogin = () => {
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		let isValidEmail = re.test(this.state.email.toLowerCase());
		if (!isValidEmail) {
			Alert.alert("Email invalide");
			return;
		}
		this.api
			.enterpriseLogin(this.state.email, this.state.password)
			.then(res => {
				console.log(res.data);
				if (res.data.success === true) {
					localStorage.setItem(
						"enterprise",
						JSON.stringify(res.data.enterprise)
					);
					localStorage.setItem("tokenEnterprise", res.data.tokenEnterprise);
					window.location = "/EnterpriseDashboard";
				} else {
					alert(res.data.message);
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
				<h2 style={{ textAlign: "center" }}>Sign In entreprise</h2>
				<Form style={{ backgroundColor: "" }}>
					<Col>
						<FormGroup>
							<Label>Email</Label>
							<Input
								type="email"
								name="email"
								value={this.state.email}
								onChange={this.handleInputChange}
								placeholder="myemail@email.com"
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
					<Button onClick={this.enterpriseLogin} disabled={this.state.loading}>
						Submit
					</Button>

					<Link className="" to="/registerEntreprise">
						Créer un compte enterprise
					</Link>
				</Form>
			</Container>
			</div>
		);
	}
}
