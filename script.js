const wLocation = document.querySelector(".w_location");
const wDateTime = document.querySelector(".w_datetime");
const wForecast = document.querySelector(".w_forecast");
const wIcon = document.querySelector(".w_icon");
const wTemperature = document.querySelector(".w_temperature");
const wTempMin = document.querySelector(".w_tempmin");
const wTempMax = document.querySelector(".w_tempmax");
const wFeelsLike = document.querySelector(".w_feelslike");
const wHumidity = document.querySelector(".w_humidity");
const wWind = document.querySelector(".w_wind");
const wPressure = document.querySelector(".w_pressure");
const citySearch = document.querySelector(".city_search");



let city = "New Delhi";

citySearch.addEventListener("submit", (e) => {
   e.preventDefault();
   const cityName = document.getElementById("city_name");
   city = cityName.value;
   fetchWeatherAPI();
   cityName.value = "";
})

function kelvinToCelsius(kelvin) {
    return kelvin - 273;
  }


const fetchWeatherAPI = async () => {
    const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=edba47cddc98b63955ae9c924b3160a4`;
    try{
        const res = await fetch(openWeatherAPI);
        const data = await res.json();
        console.log(data);

        const {main, name, weather, wind, sys, dt} = data;
        const date = dt * 1000;
        const curDate = new Date(date);

        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric"
        }

        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(curDate);


        wLocation.innerHTML = `${name}, ${sys.country}`;
        wDateTime.innerHTML = `${formattedDate}`
        wForecast.textContent = `${weather[0].main}`;
        wIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${weather[0].icon}.png">`;
        wTemperature.innerHTML = `${kelvinToCelsius(main.temp).toFixed(2)}&#176`;
        wTempMin.innerHTML =  `Min ${kelvinToCelsius(main.temp_min).toFixed(2)}&#176`;
        wTempMax.innerHTML = `Max ${kelvinToCelsius(main.temp_max).toFixed(2)}&#176`;
        wFeelsLike.innerHTML = `Feels like<br>${kelvinToCelsius(main.feels_like).toFixed(1)}&#176`;
        wHumidity.innerHTML = `Humidity<br>${main.humidity}%`;
        wWind.innerHTML = `Wind<br>${wind.speed}m/s`;
        wPressure.innerHTML = `Pressure<br>${main.pressure}hPa`;
        
    } catch(error){
        return error;
    }
    
}


fetchWeatherAPI()