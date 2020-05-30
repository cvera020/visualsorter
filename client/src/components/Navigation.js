import React from "react";
//import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortingAlgorithm: '',
			sortingSpeed: 1,
			numElements: 10,
			maxVal: 10
		};
	}

	/*
	onChangeSearchString = evt => {
		this.setState({
			state_query: evt.target.value
		});
	};
*/

	render() {
		return (
			<div>
				<Navbar bg="light" expand="lg">
					<Navbar.Brand href="#home">Sort Visualizer</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="mr-auto">
							<Nav.Link href="#home">Home</Nav.Link>
							<Nav.Link href="#link">Link</Nav.Link>
							<NavDropdown title="Dropdown" id="basic-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">
									Action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown>
						</Nav>
						<Form inline>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
							/>
							<Form.Group controlId="exampleForm.SelectCustom">
						    <Form.Control as="select" custom>
						      <option>1</option>
						      <option>2</option>
						      <option>3</option>
						      <option>4</option>
						      <option>5</option>
						    </Form.Control>
					  	</Form.Group>
							<Button variant="outline-success">Search</Button>
						</Form>
					</Navbar.Collapse>
				</Navbar>
			</div>
		);
	}
}

export default Navigation;
