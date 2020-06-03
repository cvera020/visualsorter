import React from "react";
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Canvas from "./components/Canvas"

/* IMPORT COMPONENTS */
import Navigation from "./components/Navigation";

function App() {
	return (
      <Router>
        <div>
         	<Navigation />
			<Switch>
				<Route exact path="/" component={Canvas} />
			</Switch>
		</div>
      </Router>
	);
}

export default App;
