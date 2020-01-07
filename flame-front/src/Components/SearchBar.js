import React, { Component } from "react";

export default class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchText: "",
			placeHolder: "search par gateaux"
		};
	}

	handleChange(event) {
		this.setState({ searchText: event.target.value });
		console.log("-----------------------------");
		console.log("une saise");
	}

	render() {
		return (
			<div>
				<input
					onChange={this.handleChange.bind(this)}
					placeholder={this.state.placeHolder}
				/>
				<p>{this.state.searchText}</p>
			</div>
		);
	}
}
