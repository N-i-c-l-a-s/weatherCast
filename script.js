// Your API key from OpenWeather
const apiKey = 'b72e439409752a55ce3fe6fcfeddc933';

// Function to fetch weather data based on city
function getWeather(city) {
    const baseUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch data from the API
    fetch(baseUrl)
        .then(response => {
            if (response.ok) {
                return response.json(); // Parse the JSON response
            } else {
                throw new Error('City not found.');
            }
        })
        .then(data => {
            const weather = data.weather[0]; // Extract weather description
            const main = data.main; // Extract main data, such as temperature

            // Update the page with the weather data
            document.getElementById('weather-description').textContent = `Weather: ${weather.description}`;
            document.getElementById('temperature').textContent = `Temperature: ${main.temp}°C`;
        })
        .catch(error => {
            // Handle errors (like if the city is not found)
            document.getElementById('error-message').textContent = error.message;
        });
}

// Add event listener to the button, so it calls getWeather when clicked
document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value; // Get the city from the input field
    if (city) {
        getWeather(city); // Call the getWeather function
    } else {
        document.getElementById('error-message').textContent = 'Please enter a city.';
    }
});
