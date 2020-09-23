# fullstack-weather

A fullstack weather application built with React, Express, and the APIs from MapBox and OpenWeatherMap

## How It Works

### Back End

An Express server is created, which is used for a single route (index/citySearch).

This route takes the city paramater from the URL and plugs it into the MapBox API call. The response from this request is then parsed as JSON and saved. 2 variables are created to hold the latitude and longitude for this city.

Next, these variables are passed to the request for the OpenWeatherMap API and used in that URL.

Both of these requests pull the appropriate API keys from a .env file.

Once we get the response from OpenWeatherMap, 2 things happen:

First, the data is parsed as JSON and saved to a variable. Then, 5 new variables are created to hold different data sets.

**currentWeatherData** holds the data for the current conditions at the time of request.

**hourlyWeatherData** and **dailyWeatherData** are actually arrays that hold the data for the next 5 hours days respectively

**weatherAlerts** holds the data for any alert objects if they exist

**mapData** just contains the properly formatted (basically just capitalized) city name from the MapBox response.

These 5 variables are sent to the client as JSON to be used by the React front end.

### Front End

The front end is built with React. When the app loads, it immediately fetches the appropriate MapBox and OpenWeatherMap data for the city of Chicago.
