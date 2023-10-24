async function fetchData() {
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'USE YOUR KEY',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
    } catch (error) {
        console.error(error);
    }

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);

            const location = data.location;
            const current = data.current;
            const condition = current.condition;

            // Get the HTML elements by their id
            const locationHeader = document.getElementById("locationHeader");
            const locationTime = document.getElementById("locationTime");
            const conditionImage = document.getElementById("conditionImage");
            const conditionText = document.getElementById("conditionText");
            const temperature = document.getElementById("temperature");
            const wind = document.getElementById("wind");
            const pressure = document.getElementById("pressure");
            const additional = document.getElementById("additional");

            locationHeader.innerHTML = `Location: ${location.name}, ${location.region}, ${location.country}`;
            locationTime.innerHTML = `Local Time: ${location.localtime} (${location.tz_id})`;
            conditionImage.src = `https:${condition.icon}`; // Update the image source
            conditionText.innerHTML = condition.text;
            temperature.innerHTML = `${current.temp_c}°C (${current.temp_f}°F)`;
            wind.innerHTML = `Wind Speed: ${current.wind_kph} kph (${current.wind_mph} mph)<br>Wind Direction: ${current.wind_dir} (${current.wind_degree}°)`;
            pressure.innerHTML = `${current.pressure_mb} mb (${current.pressure_in} in)`;
            additional.innerHTML = `Precipitation: ${current.precip_mm} mm (${current.precip_in} in)<br>
                                    Humidity: ${current.humidity}%<br>
                                    Cloud Cover: ${current.cloud}%<br>
                                    Feels Like: ${current.feelslike_c}°C (${current.feelslike_f}°F)<br>
                                    Visibility: ${current.vis_km} km (${current.vis_miles} miles)<br>
                                    UV Index: ${current.uv}<br>
                                    Wind Gust: ${current.gust_kph} kph (${current.gust_mph} mph)`;
        } else {
            console.error('Failed to fetch data. Status:', response.status);
        }
    } catch (error) {
        console.error(error);
    }
}

fetchData();
