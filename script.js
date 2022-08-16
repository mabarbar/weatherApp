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
  const city = input.value || "Końskowola";
  const URL = API_LINK + city + API_KEY + API_UNITS;

  axios.get(URL).then((res) => {
    console.log(res.data);
    const temp = res.data.main.temp;
    const hum = res.data.main.humidity;
    const city = res.data.name;
    const status = Object.assign({}, ...res.data.weather);

    weather.textContent = status.main;
    cityName.textContent = city;
    temperature.textContent = Math.floor(temp) + "°C";
    humidity.textContent = hum + "%";
  });
};

button.addEventListener("click", getWeather);
