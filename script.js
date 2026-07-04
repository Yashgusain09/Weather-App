const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeather API key

async function getWeather() {

    const city = document.getElementById("city").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod != 200) {
            document.getElementById("weather").innerHTML =
                "<h2>❌ City Not Found</h2>";

            document.body.style.backgroundImage =
                "url('images/default.jpg')";

            return;
        }

        // Weather details
        const weatherType = data.weather[0].main.toLowerCase();

        // Change Background
        switch (weatherType) {

            case "clear":
                document.body.style.backgroundImage = "url('images/clear.jpg')";
                break;

            case "clouds":
                document.body.style.backgroundImage = "url('images/clouds.jpg')";
                break;

            case "rain":
            case "drizzle":
                document.body.style.backgroundImage = "url('images/rain.jpg')";
                break;

            case "snow":
                document.body.style.backgroundImage = "url('images/snow.jpg')";
                break;

            case "mist":
            case "fog":
            case "haze":
            case "smoke":
                document.body.style.backgroundImage = "url('images/mist.jpg')";
                break;

            case "thunderstorm":
                document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
                break;

            default:
                document.body.style.backgroundImage = "url('images/default.jpg')";
        }

        // Display Weather Data
        document.getElementById("weather").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>

            <img
                src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"
                alt="Weather Icon"
            >

            <h1>${Math.round(data.main.temp)}°C</h1>

            <h3>${data.weather[0].main}</h3>

            <p><strong>Feels Like:</strong> ${Math.round(data.main.feels_like)}°C</p>

            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>

            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>

            <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
        `;

    } catch (error) {

        document.getElementById("weather").innerHTML =
            "<h2>⚠ Error fetching weather data.</h2>";

        document.body.style.backgroundImage =
            "url('images/default.jpg')";

        console.log(error);
    }
}
