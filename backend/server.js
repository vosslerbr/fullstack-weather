const express = require("express");
const request = require("request");
const cors = require("cors");

// allows us to store stuff in .env files
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/:lat&:long", (req, res) => {
  const lat = req.params.lat;
  const long = req.params.long;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${process.env.WEATHER_API_KEY}&units=imperial`;
  request(url, (error, response, body) => {
    res.json(JSON.parse(body));
  });

  const mapUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/sartell.json?types=place&access_token=${process.env.MAPBOX_API_KEY}`;
  request(mapUrl, (error, response, body) => {
    console.log(body);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
