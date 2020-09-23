# fullstack-weather

A **complete rebuild** of my original weather application. This time built with React, Express, and the APIs from MapBox and OpenWeatherMap. 🤠

## Why a rebuild?

After learning the basics of the MERN stack, I decided to finally rebuild my weather application using my new knowledge. 

Having a back end allowed me to finally hide my API keys in a .env file (since the old version was only a front end app, they were in plain sight for all. *OOPS!*).

React allowed me to write my code in a more modular way, helping keep me from repeating a lot of code. It also allowed me to fetch data at an interval without having to re-render the entire DOM.

I'm sure there are more, but these are the main improvments that come to mind.

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

The front end is built with React. When the app loads, it immediately fetches the appropriate MapBox and OpenWeatherMap data for the city of Chicago. While the data is fetched, we see a simple loading screen which will appear for a minimum of 1 second so as not to appear and disappear rapidly and thus be jarring to the user. The app will continue to fetch this data every 5 minutes.

Once the server responds, the JSON is seperated out and placed into state in a similar fashion it was sent by the server (currently, hourly, daily...). State also holds the currently selected city name. This will come into play in a bit.

When the user enters a city name in the search bar, the city name in state is updated and used in the new Axios request. Then the entire process starts again. Data is fetched from the server, returned as JSON, and placed into state. Obviously this updates the entire DOM structure as well.

## What's Next?

Future plans include the addition of an alert dialog to appear above the 'Right Now' section if any alerts exist. Search suggestions and a color scheme toggle are also on the horizon!
