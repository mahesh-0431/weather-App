let tempEle = document.getElementById("temp-value");
let locEle = document.getElementById("location");
let weatherdescEle = document.getElementById("weather-desc");
let btnEle = document.getElementById("btn");
let citySelect = document.getElementById("city-select");

const apiKey = '8f4485f5f505ef4d2ad72e90b213a15f';

btnEle.onclick = function() {
    const selectedCity = citySelect.value;
    
    if (selectedCity === "") {
        alert("Please select a city");
    } else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.main && data.weather) {
                    const { name } = data;
                    const { temp } = data.main;
                    const { description } = data.weather[0];
                    
                
                    tempEle.innerText = Math.round(temp - 273.15);
                    locEle.innerText = name;
                    weatherdescEle.innerText = description;
                } else {
                    alert("Weather data not found for the selected city.");
                }
            })
            .catch(() => {
                alert("An error occurred. Please try again.");
            });
    }
};
