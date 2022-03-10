import React from "react";

// props est un objet qui contient une clé weatherCity, je peux donc déstructurer l'objet props
function Card({ weatherCity, onClick }) {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg">
			<img
				className="w-24"
				src={`http://openweathermap.org/img/wn/${weatherCity.weather[0].icon}@2x.png`}
				alt="Sunset in the mountains"
			/>
			<div className="px-6 py-4">
				<div className="font-bold text-xl mb-2">
					{weatherCity.name}, {weatherCity.sys.country}
				</div>
				<p className="text-gray-700 text-base">Température: {Math.round(weatherCity.main.temp)} °C</p>
				<p className="text-gray-700 text-base">
					Min: {Math.round(weatherCity.main.temp_min)} °C / Max: {Math.round(weatherCity.main.temp_max)} °C
				</p>
			</div>
			{onClick && (
				<div className="py-3 flex justify-center">
					<button
						type="button"
						className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						onClick={onClick}
					>
						Supprimer le favori
					</button>
				</div>
			)}
		</div>
	);
}

export default Card;
