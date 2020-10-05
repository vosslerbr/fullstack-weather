import React, { Component } from "react";
import Day from "./Day";

export default class Daily extends Component {
  render() {
    //return "test";
    return this.props.data.map((element, i) => {
      return <Day dayData={element} key={i} itemId={i} />;
    });
  }
}
