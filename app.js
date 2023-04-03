// OpenWeatherMap API (Replace with own before use)
const api = '5acfe56b1607b7e9c1bd0859f276df41';

//DOM Elements
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');


window.addEventListener('load', () => {

    let long;
    let lat;

    //Retrieving Geolocaiton for User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            //Storing Longtitude and Latitude Variables
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            
            //Using Fetch Javascript API to get data
            fetch(base)
                .then((response) => response.json())
                .then((data) => {
                    const {temp} = data.main;
                    const place = data.name;
                    const {description, icon} = data.weather[0];
                    const {sunrise, sunset} = data.sys;

                    const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
                    const fahrenheit = (temp * 9) / 5 + 32;

                    //Converting Epoch Time to GMT
                    const sunriseGMT = new Date(sunrise * 1000);
                    const sunsetGMT = new Date(sunset * 1000);

                    //Interacting with DOM to show data
                    iconImg.src = iconUrl;
                    loc.textContent = `${place}`;
                    desc.textContent = `${description}`;
                    tempC.textContent = `${temp.toFixed(0)} °C`;
                    tempF.textContent = `${fahrenheit.toFixed(0)} °F`;
                    sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
                    sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
                });

        });
    } else {
        alert("Location access is not avilable. Defaulting to New York City.")
        
        //Storing Default Longtittude and Latitude Variables
        lat = 40.7128;
        long = -74.0060;
    }


});
