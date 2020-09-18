import React, { Component } from "react";

export default class FeelsLike extends Component {
  render() {
    return <p>Feels Like: {this.props.data}</p>;
  }
}
