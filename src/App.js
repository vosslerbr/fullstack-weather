import React from "react";
import axios from "axios";

export default class App extends React.Component {
  state = {
    data: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:5000/sartell`).then((res) => {
      console.log(res.data.currentWeatherData);
      const data = res.data.currentWeatherData;
      this.setState({ data });
    });
  }

  render() {
    return <p>{this.state.data.feels_like}</p>;
  }
}
