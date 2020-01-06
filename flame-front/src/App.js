import React from "react";
import "./static/css/style.css";
import "./static/css/footer.css";
import "./static/css/nav.css";
import "./static/css/produitDetaille.css";

import "./static/css/carousel.css";

import Nav from "./Components/Nav";
// import Navbar from "./Components/Nav-bar";
// import Header from "./Components/Header";

import Home from "./Screens/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ClientInscription from "./Screens/Client/ClientInscription";
import EnterpriseRegister from "./Screens/Enterprise/EnterpriseRegister";
import EnterpriseLogin from "./Screens/Enterprise/EnterpriseLogin";
import CreateAnnounce from "./Screens/Enterprise/CreateAnnounce";
import ClientLogin from "./Screens/Client/ClientLogin";
import ClientDashboard from "./Screens/Client/ClientDashboard";
import EnterpriseDashboard from "./Screens/Enterprise/EnterpriseDashboard";
import AnnonceDetaille from "./Screens/Client/AnnonceDetaille";
import MesCommandes from "./Screens/Client/MesCommandes";
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			client: null,
			entreprise: null,
			panier: null
		};
	}

	componentWillMount() {
		let client = localStorage.getItem("client");
		let entreprise = localStorage.getItem("enterprise");
		let panier = JSON.parse(localStorage.getItem("panier"));

		if (client) {
			this.setState({ client: JSON.parse(client) });
		}
		if (entreprise) {
			this.setState({ entreprise: JSON.parse(entreprise) });
		}
		this.setState({ panier: panier });
	}

	displayNav = () => {
		console.log(this.state);
		if (this.state.client) {
			return <Nav user={this.state.client} panier={this.state.panier} />;
		} else {
			if (this.state.entreprise) {
				return <Nav user={this.state.entreprise} panier={null} />;
			} else {
				return <Nav user={null} panier={null} />;
			}
		}
	};

	reloadPanier = () => {
		let panier = JSON.parse(localStorage.getItem("panier"));
		this.setState({ panier: panier });
	};

	render() {
		return (
			<Router>
				<div>
					{this.displayNav()}
					{/* <Header/> */}

					{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
					<Switch>
						<Route path="/inscription">
							<ClientInscription />
						</Route>
						<Route path="/registerEntreprise">
							<EnterpriseRegister />
						</Route>
						<Route path="/registerAnnounce">
							<CreateAnnounce />
						</Route>
						<Route path="/ClientLogin">
							<ClientLogin />
						</Route>
						<Route path="/EntrepriseLogin">
							<EnterpriseLogin />
						</Route>
						<Route path="/ClientDashboard">
							<ClientDashboard reloadPanier={this.reloadPanier} />
						</Route>
						<Route path="/EnterpriseDashboard">
							<EnterpriseDashboard />
						</Route>
						<Route path="/mesCommandes">
							<MesCommandes />
						</Route>
						<Route path="/ModifProduit"></Route>
						<Route path="/annonce/:annonceId" component={AnnonceDetaille} />
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
