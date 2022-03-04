import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// REACT-TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// PAGES & COMPONENTS
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./Components/Navbar";

// CONTEXT
export const favoritesContext = createContext();

function App() {
	// Initialisation du state : soit avec le localStorage de la clé "favoritesCities". Si il n'y a rien dans cette clé, initialisation du state avec un tableau vide.
	const [favoritesCities, setFavoritesCities] = useState(JSON.parse(localStorage.getItem("favoritesCities")) || []);

	return (
		// Context avec le state
		<favoritesContext.Provider value={{ favoritesCities, setFavoritesCities }}>
			<Navbar />
			<Router>
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route path="/favorites" element={<Favorites />} />
				</Routes>
			</Router>
			<ToastContainer />
		</favoritesContext.Provider>
	);
}

export default App;
