function getWeather() {
    const apiKey = '3a10348d79016a61372b21b3fabcd9f3';
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a10348d79016a61372b21b3fabcd9f3`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3a10348d79016a61372b21b3fabcd9f3`;

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or other error');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            alert('The city name is invalid, Please try again.');
        });

    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or other error');
            }
            return response.json();
        })
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            alert('Error fetching forecast. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivinfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');

    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const precipitationType = getPrecipitationType(data.weather[0].main);
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHtml =
        `<p>${cityName}</p>
        <p>${description}</p>
        <p>Humidity: ${humidity}%</p>
        <p>Precipitation Type: ${precipitationType}</p>`;
       

    tempDivinfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
}

function getPrecipitationType(main) {
    switch (main) {
        case 'Rain':
            return 'Rain';
        case 'Snow':
            return 'Snow';
        case 'Drizzle':
            return 'Drizzle';
        case 'Thunderstorm':
            return 'Thunderstorm';
        default:
            return 'Unknown';
    }
}


function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = ''; 
    const next24Hours = hourlyData.slice(0, 8);
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `<div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly weather Icon">
            <span>${temperature}°C</span>
        </div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
