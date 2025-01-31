document.getElementById("search").addEventListener("click", () => {
    let city = document.getElementById("city").value;
    

    if (!city) {
        alert("Please enter a city");
        return;
    }

    const promise = fetch(`https://api.weatherapi.com/v1/current.json?key=cb6538f8a8fc4df1be492634250201&q=${city}&aqi=yes`);
    
    promise
        .then((response) => response.json())
        .then((data) => {
            let result_container = document.getElementById("result-container");
            result_container.innerHTML = ""; // Clear previous results

            document.getElementById('result-container').style.display = "block";
            let img = document.createElement("img");
            img.src = "https:" + data.current.condition.icon; // Ensure HTTPS
            img.alt = "Weather Icon";
            img.className = "icon";

            let location = document.createElement("p");
            location.innerHTML = `<strong>Location:</strong> ${data.location.name}, ${data.location.country}`;

            let temperature = document.createElement("p");
            temperature.innerHTML = `<strong>Temperature:</strong> ${data.current.temp_c}°C`;

            let condition = document.createElement("p");
            condition.innerHTML = `<strong>Condition:</strong> ${data.current.condition.text}`;

            let humidity = document.createElement("p");
            humidity.innerHTML = `<strong>Humidity:</strong> ${data.current.humidity}%`;

            let windSpeed = document.createElement("p");
            windSpeed.innerHTML = `<strong>Wind Speed:</strong> ${data.current.wind_kph} km/h`;

            

            result_container.appendChild(img);
            result_container.appendChild(location);
            result_container.appendChild(condition);
            result_container.appendChild(temperature);
            result_container.appendChild(humidity);
            result_container.appendChild(windSpeed);
            
            

            // console.log(data);
        })
        .catch((error)=>{
            document.getElementById('result-container').style.display = "none";
            console.error("Error fetching data:", error);
        });
});
