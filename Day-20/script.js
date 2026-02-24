const apiKey = "a8201858e32a3bf5cbaef8277393ab55";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const loader = document.getElementById("loader");
const toggleBtn = document.getElementById("toggleBtn");

let currentCity = "";

searchBtn.addEventListener("click", getWeather);

function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Enter city name");
        return;
    }

    currentCity = city;
    loader.style.display = "block";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => {

        loader.style.display = "none";

        if (data.cod !== 200) {
            alert("City not found or API not activated yet");
            return;
        }

        cityName.textContent = data.name;
        temperature.textContent = `🌡️ ${data.main.temp} °C`;
        description.textContent = `☁️ ${data.weather[0].description}`;
        humidity.textContent = `💧 Humidity: ${data.main.humidity}%`;

        changeBackground(data.weather[0].main);

    })
    .catch(() => {
        loader.style.display = "none";
        alert("Error fetching weather");
    });
}

function changeBackground(weather) {
    if(weather === "Rain") {
        document.body.style.background = "linear-gradient(to right, #314755, #26a0da)";
    } 
    else if(weather === "Clear") {
        document.body.style.background = "linear-gradient(to right, #f7971e, #ffd200)";
    } 
    else {
        document.body.style.background = "linear-gradient(to right, #4facfe, #00f2fe)";
    }
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

setInterval(() => {
    if(currentCity !== "") {
        getWeather();
    }
}, 30000);