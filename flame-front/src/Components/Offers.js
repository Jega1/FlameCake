import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { typography } from "@material-ui/system";
import Api from "../../Services/Api";

export default class Offers extends Component {

	constructor(props) {
		super(props);
		this.api = new Api();
		this.state = {
			loading: false,
			enterprise: {},
			mesAnnonces: [],
			
		};
	}

	componentDidMount() {
		let token = localStorage.getItem("tokenEnterprise");
		let enterp = localStorage.getItem("enterprise");

		if (!token || !enterp) {
			window.location = "/EnterpriseLogin";
			return;
		}

		this.setState({ enterprise: JSON.parse(enterp) }, () => {
			this.getAnnonces();
		});
		console.log(this.state);
	}

	getAnnonces = () => {
		this.api.getAnnonces(this.state.enterprise).then(res => {
			console.log(res.data);
			if (res.data.success) {
				this.setState({ mesAnnonces: res.data.mesAnnonces });
			}
		});
	};

	render() {
			let mesAnnonces = this.state.mesAnnonces.map((annonce, index) => {
		return (
			<div>
				<Card>
					<CardMedia
						style={{ height: 0, paddingTop: "56.25%" }}
						image={annonce.photo}
						// title={this}
					/>
					<CardContent>
						<Typography gutterBottom variant="headline" componant="h2">
							{/* {this.props.} */}
						</Typography>
						<Typography componant="p">
							{/* {this.props.discription} */}
						</Typography>
					</CardContent>

					<CardActions>
						<Button size="small" color="primary" href="" target="_blank">
							go to shop
						</Button>
					</CardActions>
				</Card>
				<div>{mesAnnonces}</div>
			</div>
		);
	}
}
