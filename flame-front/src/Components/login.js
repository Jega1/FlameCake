import React, { Component } from 'react'
import Api from "../../Services/Api";

export default class login extends Component {

	constructor(props) {
		super(props);
		this.api = new Api();
	}
	state = {
		email: null,
		password: null
	};
        render() {
                return (
                        <container>
				
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
					<Button sm={{ size: 8, offset: 4 }} onClick={this.clientLogin}>
						Submit
					</Button>
                                        </Form>
                        </container>
                )
        }
}

