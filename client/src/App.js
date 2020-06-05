import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Canvas from "./components/Canvas"

/* IMPORT COMPONENTS */
import Navigation from "./components/Navigation";

function App() {
	return (
        <div>
         	<Navigation />
			 <Canvas />
		</div>
	);
}

export default App;
