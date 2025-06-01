document.getElementById("search").addEventListener("click", () => {
    let city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city");
        return;
    }

    // Step 1: Get coordinates from Nominatim
    const geoUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=06d66e5d1c75e158bc86f701a4495487`;

    fetch(geoUrl)
        .then((response) => {
            if (!response.ok) throw new Error(`Geo lookup failed. Status: ${response.status}`);
            return response.json();
        })
        .then((geoData) => {
            if (geoData.length === 0) throw new Error("City not found.");

            const lat = geoData[0].lat;
            const lon = geoData[0].lon;

            // Step 2: Get weather data from Open-Meteo
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

            return fetch(weatherUrl);
        })
        .then((response) => {
            if (!response.ok) throw new Error(`Weather fetch failed. Status: ${response.status}`);
            return response.json();
        })
        .then((weatherData) => {
            let result_container = document.getElementById("result-container");
            result_container.innerHTML = ""; // Clear previous results
            document.getElementById('result-container').style.display = "block";

            const { temperature, windspeed, weathercode } = weatherData.current_weather;

            // Optional: Weather code icon (not provided directly by Open-Meteo, you can map it)
            let icon = document.createElement("p");
            icon.textContent = `Weather Code: ${weathercode}`;

            let temp = document.createElement("p");
            temp.innerHTML = `<strong>Temperature:</strong> ${temperature}°C`;

            let wind = document.createElement("p");
            wind.innerHTML = `<strong>Wind Speed:</strong> ${windspeed} km/h`;

            result_container.appendChild(temp);
            result_container.appendChild(wind);
            result_container.appendChild(icon);
        })
        .catch((error) => {
            document.getElementById('result-container').style.display = "none";
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        });
});
