const express = require("express");
const request = require("request");
const cors = require("cors");

// store stuff in .env files
require("dotenv").config();

const app = express();

// port for hosting || local
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// search route
app.get("/:citySearch", (req, res) => {
  const cityName = req.params.citySearch;

  // fetch MapBox API using the formated city name entered by user
  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?types=place&access_token=${process.env.MAPBOX_API_KEY}`;
  // fetch happens here
  request(mapUrl, (error, response, mapBody) => {
    const mapData = JSON.parse(mapBody); // parse the response
    const searchCityLat = mapData.features[0].center[1]; // get lat for city
    const searchCityLong = mapData.features[0].center[0]; // get long for city
    //console.log(`lat: ${searchCityLat}, long: ${searchCityLong}`);

    // fetch OpenWeatherMap API using lat and long from above
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLong}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;
    // fetch happens here
    request(url, (err, resp, weatherBody) => {
      const weatherData = JSON.parse(weatherBody); // parse response
      res.json({
        // send a JSON response to client with the appropriate data
        currentWeatherData: weatherData.current,
        hourlyWeatherData: [
          weatherData.hourly["0"],
          weatherData.hourly["1"],
          weatherData.hourly["2"],
          weatherData.hourly["3"],
          weatherData.hourly["4"],
        ],
        dailyWeatherData: [
          weatherData.daily["0"],
          weatherData.daily["1"],
          weatherData.daily["2"],
          weatherData.daily["3"],
          weatherData.daily["4"],
        ],
        weatherAlerts: weatherData.alerts,
        mapData: mapData.features[0].text,
      });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
