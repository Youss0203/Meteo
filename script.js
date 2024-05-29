const apiKey = 'f6af74df0aaa04e75655620bae21701c';
const defaultCities = [];

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error(`Errore nel recupero dei dati per ${city}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Dati meteo per ${city}:`, data); // Log per debug
        return data;
    } catch (error) {
        console.error(`Errore: ${error}`);
    }
}

function createWeatherCard(city, weather) {
    const card = document.createElement('div');
    card.classList.add('weather-card');

    card.innerHTML = `
        <h2>${city}</h2>
        <p>Temperatura: ${weather.main.temp}°C</p>
        <p>Descrizione: ${weather.weather[0].description}</p>
        <p>Umidità: ${weather.main.humidity}%</p>
    `;

    return card;
}

async function displayWeather(cities) {
    const weatherCardsContainer = document.getElementById('weather-cards');
    weatherCardsContainer.innerHTML = ''; // Pulisce le schede meteo esistenti
    for (const city of cities) {
        const weatherData = await getWeatherData(city);
        if (weatherData) {
            const weatherCard = createWeatherCard(city, weatherData);
            weatherCardsContainer.appendChild(weatherCard);
        }
    }
    console.log('Dati meteo caricati'); // Log per debug
}

document.addEventListener('DOMContentLoaded', () => {
    displayWeather(defaultCities);

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', async () => {
        const cityInput = document.getElementById('city-input').value;
        if (cityInput) {
            const weatherCardsContainer = document.getElementById('weather-cards');
            weatherCardsContainer.innerHTML = ''; // Pulisce le schede meteo esistenti
            const weatherData = await getWeatherData(cityInput);
            if (weatherData) {
                const weatherCard = createWeatherCard(cityInput, weatherData);
                weatherCardsContainer.appendChild(weatherCard);
            } else {
                alert('Impossibile trovare i dati meteo per la città inserita.');
            }
        }
    });
});
