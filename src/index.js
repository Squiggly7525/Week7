function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputElement.value}&key=${apiKey}&unit=metric`;

  axios
    .get(apiUrl)
    .then(function (response) {
      console.log(response);
      let temperature = Math.round(response.data.temperature.current);
      let temperatureElement = document.querySelector("#temperature");
      temperatureElement.innerHTML = `${temperature}`;

      let condition = response.data.condition.description;
      let conditionElement = document.querySelector("#condition");
      conditionElement.innerHTML = `${condition}`;

      let humidity = response.data.temperature.humidity;
      let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = `${humidity}`;

      let wind = response.data.wind.speed;
      let windElement = document.querySelector("#wind");
      windElement.innerHTML = `${wind}`;

      let iconElement = document.querySelector("#icon");
      iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
    })

    .catch(function (error) {
      console.error("Error fetching weather data", error);
    });
}

// Function to set default city to Tehran and trigger search
function setDefaultCityAndSearch() {
  let defaultCity = "Tehran"; // Set default city to Tehran
  let searchInputElement = document.querySelector("#search-input");
  searchInputElement.value = defaultCity; // Set the input value to default city

  // Trigger search function
  search(new Event("submit"));
}

// Call the function to set default city and trigger search on page load
window.addEventListener("load", setDefaultCityAndSearch);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>15º</strong>
          </div>
          <div class="weather-forecast-temperature">9º</div>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", search);

search("");
displayForecast();
