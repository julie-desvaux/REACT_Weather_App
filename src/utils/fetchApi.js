export const fetchApi = (city) => {
	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
	).then((res) => res.json());
};
