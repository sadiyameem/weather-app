const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector(".card");
const apiKey = "84ead5e317160847a6c9161f86aaa94d";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    } else {
        displayError("Please enter a city");
    }
});


async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data) {
    if (!data || !data.weather || data.weather.length === 0) {
        displayError("weather data not available");
        return;
    }
    
    const { name: city, main: { temp, humidity }, weather: [{ description, id}], wind: {speed} } = data;

        card.textContent = "";
        card.style.display = "flex";

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const windDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(((temp - 273.15)) * (9/5) + 32).toFixed(1)}°F`;
        humidityDisplay.textContent = `Humidity: ${humidity}%`;
        const windMph = (speed * 2.237).toFixed(1); windDisplay.textContent = `Wind: ${windMph} mph`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);

        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        windDisplay.classList.add("windDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");

        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(windDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❔";
    }

}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}

function createWeatherEffects(condition){
    const effects = $('#weather-effects');
    effects.empty();
    const particle = {
        'Clear':['sun', 3],
        'Clouds':['cloud', 4],
        'Rain':['tint', 20],
        'Thunderstorm': ['bolt', 8],
        'Snow': ['snowflake', 15]
    };

    const[icon, count] = particle[condition] || ['sun', 3];

    for(let i =0; i<count; i++){
        const particleEl = $('<i>').addClass(`fas fa-${icon} weather-particle`);
        particleEl.css({
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            fontSize: Math.random() *20 + 10 + 'px',
            animationDelay: Math.random() *5 + 's'
        });
        effects.append(particleEl)
    }
}