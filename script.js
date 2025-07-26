async function getWeather() {
  const city = document.getElementById('cityInput').value.trim(); // Remove extra spaces
  const apiKey = '9b90a1c8da7c33aa9166739818fe1bc1'; // Your API Key

  // If city is empty
  if (!city) {
    document.getElementById('errorMsg').textContent = 'Please enter a city name.';
    document.getElementById('weatherInfo').innerHTML = '';
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('City not found!');
    }

    const data = await response.json();

    // Safely access values
    const weatherHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;

    document.getElementById('errorMsg').textContent = '';
    document.getElementById('weatherInfo').innerHTML = weatherHTML;

  } catch (error) {
    document.getElementById('errorMsg').textContent = error.message || 'Something went wrong.';
    document.getElementById('weatherInfo').innerHTML = '';
  }
}
