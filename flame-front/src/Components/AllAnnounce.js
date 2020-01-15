import React, { Component } from "react";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
import {
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col,
	Button
} from "reactstrap";
import Api from "../Services/Api";

export default class AllAnnounce extends Component {
	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			annonces: []
		};
	}

	componentDidMount() {
		this.getFirstAnnonces();
	}

	getFirstAnnonces = () => {
		this.api.getFirstAnnonces().then(res => {
			console.log(res.data);
			if (res.data.success) {
				this.setState({ annonces: res.data.annonces });
			}
		});
	};

	render() {
		let annonces = this.state.annonces.map((annonce, index) => {
			return (
				<Col md="4">
					<Card key={index} style={{ minHeight: "50vh", marginTop: "10rem" }}>
						<CardImg
							top
							width="100%"
							height="300px"
							src={annonce.photo}
							alt="Card image cap"
						/>
						<CardBody>
							<CardTitle style={{ fontSize: "1.5rem", color: "#f59432" }}>
								Nom: {annonce.nom}
							</CardTitle>
							<CardText style={{ fontSize: "1.5rem", color: "green" }}>
								Prix{" : "}
								{annonce.prix}
							</CardText>
							<CardSubtitle style={{ fontSize: "1.5rem" }}>
								Taille{" : "}
								{annonce.taille}
							</CardSubtitle>
							<CardSubtitle style={{ fontSize: "1.5rem" }}>
								Catégorie{" : "}
								{annonce.categorie}
							</CardSubtitle>
						</CardBody>
						<CardBody>
							<CardText style={{ fontSize: "1.5rem" }}>
								{annonce.description.substring(0, 100)}
							</CardText>
							<Button
								color="primary"
								onClick={() => (window.location = "/ClientLogin")}
							>
								Ajouter au panier
							</Button>
							<Button
								style={{ backgroundColor: "#9d2363" }}
					
								onClick={() => (window.location = "/annonce/" + annonce._id)}
							>
								Voir le produit
							</Button>
						</CardBody>
					</Card>
				</Col>
			);
		});

		return (
			<div>
				<Container>
					<Row>{annonces}</Row>
				</Container>
			</div>
		);
	}
}
