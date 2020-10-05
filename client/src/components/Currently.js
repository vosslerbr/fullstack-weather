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
      <div className={"section"}>
        <h2>{this.props.currentCity}</h2>
        <div>
          <div className="current-main">
            <div className="current-main-image">
              <img
                src={require(`../images/icons/${this.props.data.weather[0].icon}.svg`)}
                alt=""
                width="110px"
                height="110px"
              />
            </div>
            <div>
              <p className="current-main-temp">
                {Math.round(this.props.data.temp)}
              </p>
              <p className="current-main-condition">
                {this.props.data.weather[0].description}
              </p>
            </div>
          </div>

          <div className="other-conditions">
            <p>
              Feels Like<span>{Math.round(this.props.data.feels_like)}</span>
            </p>
            <p>
              Humidity
              <span>{Math.round(this.props.data.humidity) + "%"}</span>
            </p>
            <p>
              Wind
              <span>
                {" " + this.getWindDirection(this.props.data.wind_deg)}
                {" " + Math.round(this.props.data.wind_speed) + "mph"}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
