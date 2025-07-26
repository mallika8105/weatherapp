async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'YOUR_API_KEY'; // Replace with your actual OpenWeatherMap API key

  if (!city) {
    document.getElementById('errorMsg').textContent = 'Please enter a city name.';
    document.getElementById('weatherInfo').innerHTML = '';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.status === 404 || !data.name) {
      document.getElementById('errorMsg').textContent = 'City not found!';
      document.getElementById('weatherInfo').innerHTML = '';
    } else {
      document.getElementById('errorMsg').textContent = '';
      const weatherHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
      `;
      document.getElementById('weatherInfo').innerHTML = weatherHTML;
    }
  } catch (error) {
    document.getElementById('errorMsg').textContent = 'Error fetching data. Please try again.';
    document.getElementById('weatherInfo').innerHTML = '';
  }
}
