import { useState, useContext } from "react";
import { toast } from "react-toastify";

import { fetchApi } from "../utils/fetchApi";
import { favoritesContext } from "../App";

import Card from "../Components/Card";

function Home() {
	const context = useContext(favoritesContext);
	const [city, setCity] = useState("");
	const [weatherCity, setWeatherCity] = useState(null);
	const [buttonClick, setButtonClick] = useState("buttonFetch");

	// console.log(weatherCity);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (city) {
			if (buttonClick === "buttonFetch") {
				fetchApi(city)
					.then((res) => {
						if (res.cod !== 200) {
							toast.error("Pas de résultats pour cette ville");
						} else {
							setWeatherCity(res);
						}
					})
					.catch((err) => console.log(err));
			} else {
				// Enregistrement dans le local storage
				if (context.favoritesCities.length === 3) {
					toast.error("Vous ne pouvez pas avoir plus de 3 villes en favoris !");
				} else {
					// On crée une copie du context favoritesCities et on ajoute la city
					const copyFavoritesCity = [...context.favoritesCities, city];
					// On va changer le state du context favoritesCities
					context.setFavoritesCities(copyFavoritesCity);
					// On ajoute au localStorage
					localStorage.setItem("favoritesCities", JSON.stringify(copyFavoritesCity));
					toast.success("Favoris bien enregistré");
				}
			}
		} else {
			toast.error("Merci d'entrer le nom d'une ville");
		}
	};

	// console.log("Home#city :", city);
	// console.log("Home#weatherCity :", weatherCity);

	return (
		<div className="container mx-auto px-5 min-h-fit flex flex-col justify-around">
			<h1 className="text-3xl font-bold mb-3 text-center">Home</h1>
			<form onSubmit={handleSubmit} className="w-screen md:w-1/2 mx-auto">
				<label htmlFor="city" className="block text-sm font-medium text-gray-700">
					City
				</label>
				<div className="mt-1 relative rounded-md shadow-sm">
					<input
						type="text"
						name="city"
						id="city"
						className="
							form-control
							block
							w-full
							px-3 py-1.5
							text-base font-normal text-gray-700
							bg-white bg-clip-padding
							border border-solid border-gray-300
							rounded-md shadow-sm
							transition
							ease-in-out
							m-0
							focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
						"
						placeholder="Paris, Londres, Bruxelles, ..."
						value={city}
						onChange={(e) => setCity(e.target.value)}
					/>
				</div>
				<div className=" flex flex-row justify-around pt-5">
					<button
						type="submit"
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						id="buttonFetch"
						onClick={(e) => setButtonClick(e.target.id)}
					>
						Voir la météo
					</button>
					<button
						type="submit"
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						id="buttonFavorite"
						onClick={(e) => setButtonClick(e.target.id)}
					>
						Ajouter aux favoris
					</button>
				</div>
			</form>
			<div className="flex flex-row justify-around m-4">{weatherCity && <Card weatherCity={weatherCity} />}</div>
		</div>
	);
}

export default Home;
