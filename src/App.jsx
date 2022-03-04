import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// REACT-TOASTIFY
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// PAGES & COMPONENTS
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// CONTEXT
export const favoritesContext = createContext();

function App() {
	// Initialisation du state : soit avec le localStorage de la clé "favoritesCities". Si il n'y a rien dans cette clé, initialisation du state avec un tableau vide.
	const [favoritesCities, setFavoritesCities] = useState(JSON.parse(localStorage.getItem("favoritesCities")) || []);

	return (
		// Context avec le state
		<favoritesContext.Provider value={{ favoritesCities, setFavoritesCities }}>
			<div className=" min-h-screen flex flex-col justify-between">
				<Router>
					<Navbar />
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route path="/favorites" element={<Favorites />} />
					</Routes>
				</Router>
				<Footer />
			</div>
			<ToastContainer />
		</favoritesContext.Provider>
	);
}

export default App;
