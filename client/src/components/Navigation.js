import React from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { setElementCount, setAlgorithm, execAlgorithm, setAlgorithmSpeed, randomizeElements } from "../actions/algorithmOptionsAction.js";

import constants from "../constants";

import "./Navigation.css";

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="#">Sort Visualizer</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav" appear={true}>
						<Form inline>
							<Form.Label className="custom-navigation-label-padding">Array Size</Form.Label>
							<input type="range" id="elementCountRange" onChange={this.props.setElementCount}
								step={constants.ARRAY_SIZE_STEP}
								min={constants.ARRAY_SIZE_MIN}
								max={constants.ARRAY_SIZE_MAX}
								defaultValue={constants.ARRAY_SIZE_DEFAULT} />
							<Form.Label className="custom-navigation-label-padding">Speed</Form.Label>
							<input type="range" id="sortSpeedRange" onChange={this.props.setAlgorithmSpeed}
								step="1"
								min={constants.ALGO_SPEED_MIN}
								max={constants.ALGO_SPEED_MAX}
								defaultValue={constants.ALGO_SPEED_DEFAULT} />
							<Form.Label className="custom-navigation-label-padding">Algorithm</Form.Label>
							<Form.Control as="select" custom onChange={this.props.setAlgorithm}>
								<option>{constants.TEXT_BUBBLE_SORT}</option>
								<option>{constants.TEXT_MERGE_SORT}</option>
								<option>{constants.TEXT_QUICK_SORT}</option>
							</Form.Control>

							<Button id="sortExecuteButton" onClick={this.props.execAlgorithm}>Sort!</Button>
							<Button id="randomizeElementsButton" onClick={this.props.randomizeElements}>Randomize!</Button>
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
		setAlgorithmSpeed: (evt) => {
			dispatch(setAlgorithmSpeed(evt.target.value))
		},
		execAlgorithm: (evt) => {
			dispatch(execAlgorithm(evt != undefined))
		},
		randomizeElements: (evt) => {
			dispatch(randomizeElements(evt != undefined))
		}
	};
};

export default connect(null, mapDispatchToProps)(Navigation);
