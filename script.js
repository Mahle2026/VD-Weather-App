const apiKey = "2eac11fc61bd1af73b197650a4aba90e";

document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {

const city = document.getElementById("cityInput").value;

const url = 
`https://api.openweathermap.org/data/2.5/weather?=${city}&appid${apiKey}&units=metric`;

try {

    const res = await fetch(url);
    const data = await res.json();

    document.getElementById("city").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp + "°C";
    document.getElementById("desc").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = data.main.humidity + "%";
    document.getAnimations("wind").innerText = data.wind.speed +"km/h";

    document.getElementById("icon").innerText =
    data.weather[0].main === "Rain" ? "🌧️" :
    data.weather[0].main === "Clouds" ? "☁️" :
    data.weather[0].main === "Clear" ? "☀️" : "🌤️";

} catch (error) {
    alert("City not found or API error");
}
    
}