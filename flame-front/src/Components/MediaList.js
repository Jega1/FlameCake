import React from "react";
import { Jumbotron, Button, Row, Col, Container } from "reactstrap";

const MediaList = props => {
	return (
		<Container style={{ width: "90%", paddingTop: "5rem", margin: "auto" }}>
			<Row>
				<Col sm="6" xs="12">
					<Jumbotron>
						<h1 className="display-">Les meilleur pâtissier</h1>
						<p className="lead">
							This is a simple hero unit, a simple Jumbotron-style component for
							calling extra attention to featured content or information.
						</p>
						<hr className="my-2" />
						<p>
							It uses utility classes for typography and spacing to space
							content out within the larger container.
						</p>
						<p className="lead">
							<Button color="primary">Learn More</Button>
						</p>
					</Jumbotron>
				</Col>

				<Col sm="6" xs="12">
					<Jumbotron>
						<h1 className="display-">Hello, world!</h1>
						<p className="lead">
							This is a simple hero unit, a simple Jumbotron-style component for
							calling extra attention to featured content or information.
						</p>
						<hr className="my-2" />
						<p>
							It uses utility classes for typography and spacing to space
							content out within the larger container.
						</p>
						<p className="lead">
							<Button color="primary">Learn More</Button>
						</p>
					</Jumbotron>
				</Col>
			</Row>
		</Container>
	);
};

export default MediaList;
