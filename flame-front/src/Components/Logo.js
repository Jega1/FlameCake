import React, { Component } from "react";
import logo from "../static/images/logo.png";

export default class Logo extends Component {
	constructor(props){
		super(props)
	}
	render() {
		return (
			<div>
				<img src={logo} style={{ height: (this.props.height ? this.props.height : "100px")}} />
			</div>
		);
	}
}
