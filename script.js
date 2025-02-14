// Function to fetch weather data from our Vercel API route
function getWeather(city) {
    const baseUrl = `/api/weather?city=${city}`; // Calls our backend instead of OpenWeather directly

    fetch(baseUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) throw new Error(data.error);

            const weather = data.weather[0]; // Extract weather description
            const main = data.main; // Extract main data, such as temperature

            // Update the page with the weather data
            document.getElementById('weather-description').textContent = `Weather: ${weather.description}`;
            document.getElementById('temperature').textContent = `Temperature: ${main.temp}°C`;
            document.getElementById('error-message').textContent = ""; // Clear any previous errors
        })
        .catch(error => {
            // Handle errors (like if the city is not found)
            document.getElementById('error-message').textContent = error.message;
        });
}

// Add event listener to the button, so it calls getWeather when clicked
document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value.trim(); // Get the city from input
    if (city) {
        getWeather(city); // Call the function
    } else {
        document.getElementById('error-message').textContent = 'Please enter a city.';
    }
});
