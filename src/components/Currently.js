import React, { Component } from "react";

export default class FeelsLike extends Component {
  constructor(props) {
    super(props);

    this.getWindDirection = this.getWindDirection.bind(this);
  }

  getWindDirection(input) {
    // Insert the amount of degrees here
    let degrees = input;

    // Define array of directions
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

    // Split into the 8 directions
    degrees = (degrees * 8) / 360;

    // round to nearest integer.
    degrees = Math.round(degrees, 0);

    // Ensure it's within 0-7
    degrees = (degrees + 8) % 8;

    return directions[degrees];
  }

  render() {
    return (
      <div>
        <h2>{this.props.currentCity}</h2>
        <div>
          <div>
            <p>Icon: {this.props.data.weather[0].icon}</p>
          </div>
          <div>
            <p>{Math.round(this.props.data.temp)}</p>
            <p>{this.props.data.weather[0].description}</p>
          </div>
        </div>

        <div>
          <p>Feels Like: {Math.round(this.props.data.feels_like)}</p>
          <p>Humidity: {Math.round(this.props.data.humidity) + "%"}</p>
          <p>
            Wind:
            {" " + this.getWindDirection(this.props.data.wind_deg)}
            {" " + Math.round(this.props.data.wind_speed) + "mph"}
          </p>
        </div>
      </div>
    );
  }
}
