import React from "react";
import { Jumbotron, Button, Row, Col, Container } from "reactstrap";

const MediaList = props => {
	return (
		<Container style={{ width: "100%", paddingTop: "4rem", margin: "auto" }}>
			<Row>
				<Col sm="6" xs="12">
					<Jumbotron>
						<h1 className="display-">Les meilleur pâtissier</h1>
						<p className="lead">
							Lorem Ipsum is simply dummy text of the printing and typesetting industry.
							 Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
							  when an unknown printer took a galley of type and scrambled it to make a type 
							  specimen book. It has survived not only five centuries, but also the leap into electronic 
							  typesetting, remaining essentially unchanged. It was popularised in the 1960s with th
							  e release of Letraset sheets containing Lorem
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
