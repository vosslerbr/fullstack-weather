import React, { Component } from "react";

export default class Day extends Component {
  constructor(props) {
    super(props);
    this.convertTime = this.convertTime.bind(this);
  }

  convertTime(unix, type) {
    const unixTimestamp = unix;

    const milliseconds = unixTimestamp * 1000;

    const dateObject = new Date(milliseconds);

    return dateObject.toLocaleString("en-US", type);

    // dateObject.toLocaleString("en-US", {weekday: "long"}) // Monday
    // dateObject.toLocaleString("en-US", {month: "long"}) // December
    // dateObject.toLocaleString("en-US", {day: "numeric"}) // 9
    // dateObject.toLocaleString("en-US", {year: "numeric"}) // 2019
    // dateObject.toLocaleString("en-US", {hour: "numeric"}) // 10 AM
    // dateObject.toLocaleString("en-US", {minute: "numeric"}) // 30
    // dateObject.toLocaleString("en-US", {second: "numeric"}) // 15
    // dateObject.toLocaleString("en-US", {timeZoneName: "short"}) // 12/9/2019, 10:30:15 AM CST
  }

  render() {
    return (
      <div className="day-container">
        <div className="day-and-date">
          <p className="day-name">
            {this.convertTime(this.props.dayData.dt, { weekday: "long" })}
          </p>
          <p className="month-date">
            {this.convertTime(this.props.dayData.dt, { month: "long" })}{" "}
            {this.convertTime(this.props.dayData.dt, { day: "numeric" })}
          </p>
        </div>
        <div>
          <div className="day-image-temps">
            <div>
              <img
                src={require(`../images/icons/${this.props.dayData.weather[0].icon}.svg`)}
                alt=""
                width="50px"
                height="50px"
              />
            </div>
            <div className="day-temps">
              <p>Hi: {Math.round(this.props.dayData.temp.max)}</p>
              <p>Lo: {Math.round(this.props.dayData.temp.min)}</p>
            </div>
          </div>

          <p className="day-precip">
            Chance of precip: {Math.round(this.props.dayData.pop * 100) + "%"}
          </p>
        </div>
      </div>
    );
  }
}
