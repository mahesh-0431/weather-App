let inputEle = document.getElementById("location-input");
let tempEle = document.getElementById("temp-value");
let locEle = document.getElementById("location");
let weatherdescEle = document.getElementById('weather-desc');
let btnEle = document.getElementById("btn");
let datalist = document.getElementById("location-list");

const apiKey = '8f4485f5f505ef4d2ad72e90b213a15f';

// Event listener to fetch location suggestions
inputEle.addEventListener("input", function() {
    const query = inputEle.value.trim();
    if (query.length < 1) return; // Only fetch if input has at least 1 character
    
    // Geocoding API URL with query parameter
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

    fetch(geoUrl)
        .then(response => response.json())
        .then(data => {
            datalist.innerHTML = ""; // Clear previous suggestions

            // Check if we received valid data
            if (Array.isArray(data) && data.length > 0) {
                data.forEach(location => {
                    const option = document.createElement("option");
                    option.value = `${location.name}, ${location.country}`;
                    datalist.appendChild(option);
                });
            } else {
                console.log("No matching locations found");
            }
        })
        .catch(error => {
            console.error("Error fetching location data:", error);
        });
});


btnEle.onclick = function(){
    if(inputEle.value === "")
        alert("Please enter a location");
    else{
        const loc = inputEle.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=${apiKey}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data && data.main && data.weather) {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { description } = data.weather[0];
                    tempEle.innerText = Math.floor(feels_like - 273); // Convert from Kelvin to Celsius
                    locEle.innerText = name;
                    weatherdescEle.innerText = description;
                } else {
                    alert("Location not found. Please try another.");
                }
            })
            .catch(() => {
                alert("Please enter a valid location");
            });
        inputEle.value = "";
    }
};
