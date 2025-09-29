const API_KEY = "bf3d57595f2a7147c3e0ebf6c22d3d1e"; // Replace with your actual OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("weatherInfo").innerHTML = "<p>City not found!</p>";
      } else {
        document.getElementById("weatherInfo").innerHTML = `
          <h3>${data.name}, ${data.sys.country}</h3>
          <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
          <div class="temp">${Math.round(data.main.temp)}°C</div>
          <div class="description">${data.weather[0].description}</div>
          <div class="details">
            <div class="detail-box">Feels like: ${Math.round(data.main.feels_like)}°</div>
            <div class="detail-box">Humidity: ${data.main.humidity}%</div>
            <div class="detail-box">Wind: ${data.wind.speed} m/s</div>
          </div>
        `;
      }
    })
    .catch(error => {
      document.getElementById("weatherInfo").innerHTML = "<p>Error fetching data!</p>";
      console.error(error);
    });
}
