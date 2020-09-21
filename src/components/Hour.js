import React, { Component } from "react";

export default class Hour extends Component {
  render() {
    return (
      <div>
        <p>{this.props.hourData.dt}</p>
        <p>{this.props.hourData.weather[0].icon}</p>
        <p>{this.props.hourData.temp}</p>
        <p>{this.props.hourData.weather[0].description}</p>
      </div>
    );
  }
}
