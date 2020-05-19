var notification = document.querySelector(".notification");
var weatherIcon = document.querySelector(".weather-icon");
var temperatureValue = document.querySelector(".temperature-value");
var temperatureDescription = document.querySelector(".temperature-description");
var loc = document.querySelector(".location");


var weather = {
    temperature: {
        value : null,
        unit : null
    },
    description : null,
    iconId : null,
    city : null,
    country : null
}

function celciusToFahrenheit(temperature){
    return (temperature*9/5)+32;
}

temperatureValue.addEventListener("click",function(){
    if(weather.temperature.value===undefined){return}
    if(weather.temperature.unit==="celcius"){
       var fahrenheit = celciusToFahrenheit(weather.temperature.value);
           fahrenheit=Math.floor(fahrenheit);
           temperatureValue.innerHTML =`<p>${fahrenheit}- ° <span>F</span></p>`
           weather.temperature.unit = "fahrenheit";
    }
    else{
        temperatureValue.innerHTML =`<p>${weather.temperature.value}- ° <span>C</span></p>`;
        weather.temperature.unit = "celcius";
    }
})

const key = "d14904ea36062d67d1e969fc7a0f776b";
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError)
}
else{
    notification.style.display = "block";
    notification.innerHTML = `<p>Brower doesnot support geolocation</p>`
}

function setPosition(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getWeather(longitude,latitude);
}

function showError(error){
    notification.style.display = "block";
    notification.innerHTML = `<p> ${error.message}</p>`
}

function getWeather(longitude,latitude){
    var api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
    .then((response)=>{
        var data =response.json();
        return data;
    })
    .then((data)=>{
        weather.temperature.value = Math.floor(data.main.temp -273);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(()=>{
        displayWeather();
    })
}

function displayWeather(){
    weatherIcon.innerHTML = `<img src="./black/png/128x128/${weather.iconId}.png" alt="">`
    temperatureValue.innerHTML = `<p>${weather.temperature.value}- ° <span>C</span></p>`
    temperatureDescription.innerHTML =`<p>${weather.description}</p>`
    loc.innerHTML =`<p>${weather.city},${weather.country}</p>`
}
