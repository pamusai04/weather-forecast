document.getElementById("search").addEventListener("click", () => {
  const city = document.getElementById("city").value.trim();

  if (!city) {
    alert("Please enter a city");
    return;
  }

  // OpenWeatherMap API URL with your API key
  const openWeatherKey = "06d66e5d1c75e158bc86f701a4495487";
  const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${openWeatherKey}&units=metric`;

  fetch(geoUrl)
    .then((response) => {
      if (!response.ok) throw new Error(`City not found or error: ${response.status}`);
      return response.json();
    })
    .then((geoData) => {
      // Access lat and lon properly
      if (!geoData.coord) throw new Error("Coordinates not found.");

      const lat = geoData.coord.lat;
      const lon = geoData.coord.lon;

      // Fetch current weather from Open-Meteo using coordinates
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      return fetch(weatherUrl)
        .then((response) => {
          if (!response.ok) throw new Error(`Weather fetch failed: ${response.status}`);
          return response.json();
        })
        .then((weatherData) => {
          // Show results
          const container = document.getElementById("result-container");
          container.style.display = "block";
          container.innerHTML = ""; // clear previous

          const locationP = document.createElement("p");
          locationP.innerHTML = `<strong>Location:</strong> ${geoData.name}, ${geoData.sys.country}`;

          const tempP = document.createElement("p");
          tempP.innerHTML = `<strong>Temperature:</strong> ${weatherData.current_weather.temperature} °C`;

          const windP = document.createElement("p");
          windP.innerHTML = `<strong>Wind Speed:</strong> ${weatherData.current_weather.windspeed} km/h`;

          const weatherCodeP = document.createElement("p");
          weatherCodeP.innerHTML = `<strong>Weather Code:</strong> ${weatherData.current_weather.weathercode}`;

          container.appendChild(locationP);
          container.appendChild(tempP);
          container.appendChild(windP);
          container.appendChild(weatherCodeP);
        });
    })
    .catch((error) => {
      const container = document.getElementById("result-container");
      container.style.display = "none";
      console.error("Error:", error);
      alert(error.message);
    });
});
