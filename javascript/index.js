let selectedCityTimeZone = null;

const citiesElement = document.querySelector("#cities");
const citySelect = document.querySelector("#city");

const defaultCitiesHTML = citiesElement.innerHTML;

function updateCity(cityId, timezone) {
  let cityElement = document.querySelector(`#${cityId}`);
  if (!cityElement) return;

  let timezoneElement = cityElement.querySelector(".timezone");
  let dateElement = cityElement.querySelector(".date");
  let timeElement = cityElement.querySelector(".time");

  let cityTime = moment().tz(timezone);

  timezoneElement.innerHTML = cityTime.format("z");
  dateElement.innerHTML = cityTime.format("dddd, MMMM Do YYYY");

  timeElement.innerHTML = `
    ${cityTime.format("HH:mm")}
    <span class="seconds">:${cityTime.format("ss")}</span>
    <span class="milliseconds">.${cityTime.format("SSS")}</span>
  `;
}

function updateClock() {
  updateCity("madrid", "Europe/Madrid");
  updateCity("perth", "Australia/Perth");
  updateCity("tokyo", "Asia/Tokyo");

  if (selectedCityTimeZone !== null) {
    updateSelectedCityView();
  }
}

updateClock();
setInterval(updateClock, 80);

function resetToHome() {
  selectedCityTimeZone = null;
  citySelect.value = "";
  citiesElement.innerHTML = defaultCitiesHTML;
  updateClock();
}

function renderSelectedCity() {
  if (!selectedCityTimeZone) return;

  let cityName = selectedCityTimeZone.split("/").pop().replace(/_/g, " ");

  citiesElement.innerHTML = `
    <div class="city selected-city">

      <div class="city-info">

        <div class="city-header">
          <h2>${cityName.toUpperCase()}</h2>
        </div>

        <div class="timezone"></div>

        <div class="date"></div>

      </div>

      <div class="time"></div>

    </div>

    <div class="all-cities">
      <a href="/" id="return-home">← Return Home</a>
    </div>
  `;
}

function updateSelectedCityView() {
  if (!selectedCityTimeZone) return;

  let cityTime = moment().tz(selectedCityTimeZone);

  let timezoneElement = document.querySelector(".selected-city .timezone");
  let dateElement = document.querySelector(".selected-city .date");
  let timeElement = document.querySelector(".selected-city .time");

  if (!timezoneElement || !dateElement || !timeElement) return;

  let cityName = selectedCityTimeZone.split("/").pop().replace(/_/g, " ");

  timezoneElement.innerHTML = cityTime.format("z");
  dateElement.innerHTML = cityTime.format("dddd, MMMM Do YYYY");

  timeElement.innerHTML = `
    ${cityTime.format("HH:mm")}
    <span class="seconds">:${cityTime.format("ss")}</span>
    <span class="milliseconds">.${cityTime.format("SSS")}</span>
  `;
}

citiesElement.addEventListener("click", function (event) {
  if (event.target.id === "return-home") {
    event.preventDefault();
    resetToHome();
  }
});

function updateSelectedCity(event) {
  let selectedValue = event.target.value;

  if (!selectedValue) return;

  if (selectedValue === "current") {
    selectedCityTimeZone = moment.tz.guess();
  } else {
    selectedCityTimeZone = selectedValue;
  }

  renderSelectedCity();
}

citySelect.addEventListener("change", updateSelectedCity);
