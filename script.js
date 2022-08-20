const input = document.querySelector("input");
const button = document.querySelector("button");
const cityName = document.querySelector(".city-name");
const warning = document.querySelector(".warning");
const photo = document.querySelector(".photo");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const humidity = document.querySelector(".humidity");

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q=";
const API_KEY = "&appid=e862255a59c58245e46896507ecffd17";
const API_UNITS = "&units=metric";

const getWeather = () => {
  const city = input.value;
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios
    .get(URL)
    .then((res) => {
      const temp = res.data.main.temp;
      const hum = res.data.main.humidity;
      const city = res.data.name;
      const status = Object.assign({}, ...res.data.weather);

      warning.textContent = "";
      input.value = "";

      weather.textContent = status.main;
      cityName.textContent = city;
      temperature.textContent = Math.floor(temp) + "°C";
      humidity.textContent = hum + "%";

      const weatherID = status.id;
      console.log(weatherID);
      if (weatherID >= 200 && weatherID <= 232)
        photo.setAttribute("src", "./img/thunderstorm.png");
      else if (weatherID >= 300 && weatherID <= 321)
        photo.setAttribute("src", "./img/drizzle.png");
      else if (weatherID >= 500 && weatherID <= 532)
        photo.setAttribute("src", "./img/rain.png");
      else if (weatherID >= 600 && weatherID <= 622)
        photo.setAttribute("src", "./img/ice.png");
      else if (weatherID >= 701 && weatherID <= 781)
        photo.setAttribute("src", "./img/fog.png");
      else if (weatherID === 800) photo.setAttribute("src", "./img/sun.png");
      else if (weatherID >= 801 && weatherID <= 804)
        photo.setAttribute("src", "./img/cloud.png");
      else photo.setAttribute("src", "./img/unknown.png");
    })
    .catch(() => (warning.textContent = "Please, enter correct city name"));
};

const checkEnter = (e) => {
  if (e.key === "Enter") getWeather();
};

button.addEventListener("click", getWeather);
input.addEventListener("keyup", checkEnter);
