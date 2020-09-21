import React, { Component } from "react";

export default class Hour extends Component {
  constructor(props) {
    super(props);
    this.convertTime = this.convertTime.bind(this);
  }

  convertTime(unix) {
    const unixTimestamp = unix;

    const milliseconds = unixTimestamp * 1000;

    const dateObject = new Date(milliseconds);

    return dateObject.toLocaleString("en-US", { hour: "numeric" });

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
      <div>
        <p>{this.convertTime(this.props.hourData.dt)}</p>
        <div>
          <img
            src={require(`../images/icons/${this.props.hourData.weather[0].icon}.svg`)}
            alt=""
            width="50px"
            height="50px"
          />
        </div>
        <p>{Math.round(this.props.hourData.temp)}</p>
        <p>{this.props.hourData.weather[0].description}</p>
      </div>
    );
  }
}
