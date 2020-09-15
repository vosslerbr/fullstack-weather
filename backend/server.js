const express = require("express");
const request = require("request");
const cors = require("cors");

// allows us to store stuff in .env files
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/:citySearch", (req, res) => {
  const cityName = req.params.citySearch;

  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${cityName}.json?types=place&access_token=${process.env.MAPBOX_API_KEY}`;
  request(mapUrl, (error, response, mapBody) => {
    const mapData = JSON.parse(mapBody);
    const searchCityLat = mapData.features[0].center[1];
    const searchCityLong = mapData.features[0].center[0];
    console.log(`lat: ${searchCityLat}, long: ${searchCityLong}`);

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchCityLat}&lon=${searchCityLong}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;
    request(url, (err, resp, weatherBody) => {
      res.json(JSON.parse(weatherBody));
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
