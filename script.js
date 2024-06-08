document.getElementById("location-input").addEventListener('change', async () => {
    const location = document.getElementById("location-input").value;
    const weatherData = await getWeatherData(location);
    displayWeatherData(weatherData);
});

const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }
    const apikey = 'ff5d802b240a98893d05c72d5aefaa66';
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return {};
    }
};

const bgcolor = (temperature) => {
    if (temperature < 0) {
        return 'lightblue';
    } else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }
};

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");
    if (Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Please enter a location to see the weather.";
    } else {
        const backgroundColor = bgcolor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backgroundColor;
        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${Math.floor(data.main.temp - 273.15)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
};

window.onload = async () => {
    // Provide a default location if needed, or handle accordingly
    const defaultLocation = "London"; // Example default location
    const weatherData = await getWeatherData(defaultLocation);
    displayWeatherData(weatherData);
};
