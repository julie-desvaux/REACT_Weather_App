import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { fetchApi } from "../utils/fetchApi";
import { favoritesContext } from "../App";
import Card from "../Components/Card";

function Favorites() {
	const context = useContext(favoritesContext);
	const navigate = useNavigate();

	const [weatherCities, setWeatherCities] = useState([]);

	useEffect(() => {
		if (context.favoritesCities.length !== 0) {
			context.favoritesCities.forEach((city) => fetchFunc(city));
		}
	}, [context.favoritesCities]);

	// Fonction asynchrone pour faire le fetch dans le forEach
	const fetchFunc = async (city) => {
		await fetchApi(city).then((res) => setWeatherCities([...weatherCities, res]));
	};

	console.log("FAVORITES#weatherCities :", weatherCities);

	return (
		<>
			<h1 className="text-3xl font-bold text-center">Favorites</h1>
			{context.favoritesCities.length === 0 ? (
				<>
					<h2>Vous n'avez pas encore de favoris</h2>
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						id="buttonFavorite"
						onClick={() => navigate("/")}
					>
						Retour à l'accueil
					</button>
				</>
			) : (
				weatherCities.map((weatherCity, index) => <Card key={index} weatherCity={weatherCity} />)
			)}
		</>
	);
}

export default Favorites;
