let selectedCityTimeZone = null;

const citiesElement = document.querySelector("#cities");

const defaultCitiesHTML = citiesElement.innerHTML;

function updateCity(cityId, timezone) {
  let cityElement = document.querySelector(`#${cityId}`);
  if (cityElement === null) return;

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
  if (selectedCityTimeZone !== null) return;

  updateCity("madrid", "Europe/Madrid");
  updateCity("perth", "Australia/Perth");
  updateCity("tokyo", "Asia/Tokyo");
}

updateClock();
setInterval(updateClock, 80);

function resetToHome() {
  selectedCityTimeZone = null;
  document.querySelector("#city").value = "";
  citiesElement.innerHTML = defaultCitiesHTML;
  updateClock();
}

function renderSelectedCity() {
  if (!selectedCityTimeZone) return;

  let cityName = selectedCityTimeZone.split("/").pop().replace(/_/g, " ");

  let cityTime = moment().tz(selectedCityTimeZone);

  citiesElement.innerHTML = `
    <div class="city selected-city">

      <div class="city-info">

        <div class="city-header">
          <h2>${cityName.toUpperCase()}</h2>
        </div>

        <div class="timezone">
          ${cityTime.format("z")}
        </div>

        <div class="date">
          ${cityTime.format("dddd, MMMM Do YYYY")}
        </div>

      </div>

      <div class="time">
        ${cityTime.format("HH:mm")}
        <span class="seconds">:${cityTime.format("ss")}</span>
        <span class="milliseconds">.${cityTime.format("SSS")}</span>
      </div>

    </div>

    <div class="all-cities">
      <a href="/" id="return-home">← Return Home</a>
    </div>
  `;

  document
    .querySelector("#return-home")
    .addEventListener("click", function (event) {
      event.preventDefault();
      resetToHome();
    });
}

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

document.querySelector("#city").addEventListener("change", updateSelectedCity);

setInterval(function () {
  if (selectedCityTimeZone !== null) {
    renderSelectedCity();
  }
}, 80);
