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

  timeElement.innerHTML = `${cityTime.format("HH:mm")}
 <span class="seconds">
   :${cityTime.format("ss")}
 </span>
 <span class="milliseconds">
   .${cityTime.format("SSS")}
 </span>`;
}

function updateClock() {
  updateCity("madrid", "Europe/Madrid");
  updateCity("perth", "Australia/Perth");
  updateCity("tokyo", "Asia/Tokyo");
}

updateClock();

setInterval(updateClock, 50);
