import React, { Component } from "react";
import Hour from "./Hour";

export default class Hourly extends Component {
  render() {
    //return "test";
    return this.props.data.map((element, i) => {
      return <Hour hourData={element} key={i} itemId={i} />;
    });
  }
}
