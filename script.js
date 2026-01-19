const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector(".card");
const apiKey = "84ead5e317160847a6c9161f86aaa94d";

weatherForm.addEventListener("submit", event => {

    event.preventDefualt();

    const city = cityInput.ariaValueMax;

    if(city){

    } else {
        displayError("Please enter a city");
    }
});


async function displayWeatherInfo(city) {
    
}

function dispkayWeatherInfo(data) {

}

function getWeatherEmoji(weatherId){

}

function displayError(message){

}