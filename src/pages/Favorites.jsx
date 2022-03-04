import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { fetchApi } from "../utils/fetchApi";
import { favoritesContext } from "../App";
import Card from "../Components/Card";

function Favorites() {
	const context = useContext(favoritesContext);
	const navigate = useNavigate();

	const [weatherCities, setWeatherCities] = useState([]);
	const [isLoading, setIsloading] = useState(true);

	useEffect(() => {
		if (context.favoritesCities.length !== 0) {
			fetchFunc();
		}
	}, [context.favoritesCities]);

	// Fonction asynchrone pour faire le fetch dans le forEach
	const fetchFunc = async () => {
		const promises = [];
		context.favoritesCities.forEach((city) => promises.push(fetchApi(city)));
		await Promise.all(promises).then((res) => setWeatherCities([...weatherCities, res]));
		setIsloading(false);
	};

	console.log("FAVORITES#weatherCities :", weatherCities);

	if (isLoading) {
		return <h3>Loading ...</h3>;
	}

	return (
		<div className="py-9">
			<h1 className="text-3xl font-bold text-center">Favorites</h1>
			<div className="flex flex-row justify-around mt-6">
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
					weatherCities[0].map((weatherCity, index) => {
						console.log("FAVORITES#map :", weatherCity);
						return <Card key={index} weatherCity={weatherCity} />;
					})
				)}
			</div>
		</div>
	);
}

export default Favorites;
