let selectedCityTimeZone = null;

function updateCity(cityId, timezone) {
  let cityElement = document.querySelector(`#${cityId}`);
  if (cityElement === null) {
    return;
  }
  let timezoneElement = cityElement.querySelector(".timezone");
  let dateElement = cityElement.querySelector(".date");
  let timeElement = cityElement.querySelector(".time");
  let cityTime = moment().tz(timezone);

  timezoneElement.innerHTML = cityTime.format("z");

  dateElement.innerHTML = cityTime.format("dddd, MMMM Do YYYY");

  timeElement.innerHTML = `
    ${cityTime.format("HH:mm")}
    
    <span class="seconds">
      :${cityTime.format("ss")}
    </span>

    <span class="milliseconds">
      .${cityTime.format("SSS")}
    </span>
  `;
}

function updateClock() {
  if (selectedCityTimeZone !== null) {
    return;
  }

  updateCity("madrid", "Europe/Madrid");
  updateCity("perth", "Australia/Perth");
  updateCity("tokyo", "Asia/Tokyo");
}

updateClock();

setInterval(updateClock, 80);

function renderSelectedCity() {
  if (selectedCityTimeZone === null) {
    return;
  }
  let cityName = selectedCityTimeZone.replace("_", " ").split("/")[1];
  let cityTime = moment().tz(selectedCityTimeZone);
  let citiesElement = document.querySelector("#cities");
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

        <span class="seconds">
          :${cityTime.format("ss")}
        </span>

        <span class="milliseconds">
          .${cityTime.format("SSS")}
        </span>

      </div>

    </div>
  `;
}

function updateSelectedCity(event) {
  selectedCityTimeZone = event.target.value;

  if (selectedCityTimeZone.length === 0) {
    return;
  }

  renderSelectedCity();
}

setInterval(function () {
  if (selectedCityTimeZone !== null) {
    renderSelectedCity();
  }
}, 80);

let citiesSelectElement = document.querySelector("#city");

citiesSelectElement.addEventListener("change", updateSelectedCity);
