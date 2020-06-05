import React from "react";
import { connect } from "react-redux";
//import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

import { setElementCount, setAlgorithm, execAlgorithm } from "../actions/algorithmOptionsAction.js";

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortingAlgorithm: "Bubble Sort",
			sortingSpeed: 1,
			numElements: 10,
			maxVal: 10
		};
	}

	render() {
		return (
			<div>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="#">Sort Visualizer</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Form inline>
							<Form.Label>Array length</Form.Label>
							<Form.Control as="select" custom onChange={this.props.setElementCount}>
								<option>10</option>
								<option>50</option>
								<option>100</option>
								<option>1000</option>
								<option>2000</option>
							</Form.Control>
							<Form.Label>Algorithm</Form.Label>
							<Form.Control as="select" custom onChange={this.props.setAlgorithm}>
								<option>Bubble Sort</option>
								<option>Selection Sort</option>
							</Form.Control>
							<Button onClick={this.props.execAlgorithm}>Sort!</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		setElementCount: (evt) => {
			dispatch(setElementCount(evt.target.value));
		},
		setAlgorithm: (evt) => {
			dispatch(setAlgorithm(evt.target.value));
		},
		execAlgorithm: (evt) => {
			dispatch(execAlgorithm(evt !== undefined))
		}
	};
};

export default connect(null, mapDispatchToProps)(Navigation);
