document.addEventListener("DOMContentLoaded", () => {

const apiKey = "2eac11fc61bd1af73b197650a4aba90e";

const map = L.map("map").setView([-29.8587, 31.0218], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = L.marker([20, 0]).addTo(map);

const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");

btn.addEventListene("click", getWeather);

input.addEventListener("keypress", (e) => {
     if (e.key === "Enter") {
        getWeather();
     }
});

async function getWeather() {
const city = input.value.trim();

if (!city) {
    alert("Please enter a city");
    return;
}

const url = 
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

try {

    const res = await fetch(url);
    const data = await res.json();

    console.log(data);

if (data.cod !== 200) {
    alert(data.message || "City not found");
    return;
}

    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getElementById("wind").innerText = data.wind.speed +"km/h";

    document.getElementById("icon").innerText =
    data.weather[0].main === "Rain" ? "🌧️" :
    data.weather[0].main === "Clouds" ? "☁️" :
    data.weather[0].main === "Clear" ? "☀️" : "🌤️";

    const lat =data.coord.lat;
    const lon = data.coord.lon;

    map.setView([lat, lon], 10);

    marker.setLatLng([lat, lon])
          .bindPopuo(`${data.name} 🌤️`)
          .openPopup();

} catch (error) {
    alert("City not found or API error");
}
    
}

});