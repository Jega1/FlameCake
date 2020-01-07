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
import Carousel from "../../Components/Carousel";
import Footer from "../../Components/Footer";
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
				<Carousel />
				<Container
					style={{
						backgroundColor: "whitesmoke",
						width: "80%",
						margin: "auto",
						padding: " 4rem"
					}}
				>
					<h2 style={{ textAlign: "center" }}>Sign In entreprise</h2>
					<Form
						style={{
							background: "whitesmoke",
							width: "80%",
							margin: "auto",
							padding: "4rem"
						}}
					>
						<Col>
							<FormGroup>
								<Label style={{ fontSize: "2rem" }}>Email</Label>
								<Input
									type="email"
									name="email"
									value={this.state.email}
									onChange={this.handleInputChange}
									placeholder="myemail@email.com"
									style={{ fontSize: "2rem" }}
								/>
							</FormGroup>
						</Col>
						<Col>
							<FormGroup>
								<Label for="examplePassword" style={{ fontSize: "2rem" }}>
									Password
								</Label>
								<Input
									type="password"
									name="password"
									value={this.state.password}
									onChange={this.handleInputChange}
									placeholder="********"
									style={{ fontSize: "2rem" }}
								/>
							</FormGroup>
						</Col>
						<Button
							color="primary"
							style={{ padding: ".7rem 3rem", fontSize: "1.5rem" }}
							onClick={this.enterpriseLogin}
							disabled={this.state.loading}
						>
							Submit
						</Button>

						<Link
							className=""
							style={{ fontSize: "2rem", margin: "0 4rem" }}
							to="/registerEntreprise"
						>
							Créer un compte 
						</Link>
					</Form>
				</Container>
				<Footer />
			</div>
		);
	}
}
