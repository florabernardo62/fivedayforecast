function display() {
    var APIkey = "a7a72a34e97ee9818b3994edc2ce657f";
    var city = document.getElementById("city").value;
    console.log(city);
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`;
    fetch(queryURL)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        console.log(data);
        document.getElementById("city-name").innerHTML = data.name;
        document.getElementById("temp").innerHTML = data.main.temp.toFixed(1);
        document.getElementById("description").innerHTML = data.weather[0].description;
        document.getElementById("humidity").innerHTML = data.main.humidity;
        document.getElementById("wind-speed").innerHTML = data.wind.speed.toFixed(1);
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIkey}`;
        fetch(uvURL)
          .then(function(response) {
            return response.json();
          })
          .then(function(uvData) {
            console.log(uvData);
            var uvValue = uvData.value;
            var uvEl = document.getElementById("uv-index");
            uvEl.innerHTML = uvValue.toFixed(1);
            if (uvValue <= 2) {
              uvEl.style.backgroundColor = "green";
            } else if (uvValue <= 5) {
              uvEl.style.backgroundColor = "yellow";
            } else if (uvValue <= 7) {
              uvEl.style.backgroundColor = "orange";
            } else if (uvValue <= 10) {
              uvEl.style.backgroundColor = "red";
            } else {
              uvEl.style.backgroundColor = "purple";
            }
          })
          .catch(function(error) {
            console.error('Error:', error);
          });
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  }
  