const API = {
    KEY: "0ce9d54dfe077f307822aafc8b7bcdff",
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather"
}

let searchElement = document.querySelector(".search-box");

searchElement.addEventListener("keypress", setCityName);

function setCityName(e) {
    // To capture event for 'Enter' keypress and invoke 'fetchWeatherData'
    if (e.keyCode == 13) {
        fetchWeatherData(e.target.value)
    }
}

function fetchWeatherData(city) {
    // To fetch weather data from OpenWeather API
    fetch(`${API.BASE_URL}?q=${city}&appid=${API.KEY}&units=metric`)
        .then((res) => res.json())
        .then(res => displayData(res))
}

function displayData(weatherData) {

    let city = document.querySelector(".city");
    // To display country name from country code
    let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    city.innerText = `${weatherData.name}, ${regionNames.of(weatherData.sys.country)}`;

    let date = new Date();
    // Hard-coding day and month values to use corresponding date indices
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentDate = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    let dateElem = document.querySelector(".date");
    dateElem.innerText = currentDate;

    let temp = document.querySelector(".temp");
    temp.innerText = Math.round(weatherData.main.temp) + "°C";

    let conditions = document.querySelector(".conditions");
    conditions.innerText = weatherData.weather[0].description;

    let temp_range = document.querySelector(".temp-range");
    temp_range.innerText = Math.round(weatherData.main.temp_min) + "°C / " + Math.round(weatherData.main.temp_max) + "°C";
}