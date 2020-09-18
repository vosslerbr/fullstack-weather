import React from "react";
import axios from "axios";
import FeelsLike from "./components/FeelsLike";
import Condition from "./components/Condition";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCity: "",
      weatherData: [],
      mapData: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/chicago`).then((res) => {
      const weatherData = res.data.currentWeatherData;
      const mapData = res.data.mapData;
      this.setState({ weatherData, mapData });
    });
  }

  handleChange(event) {
    this.setState({ selectedCity: event.target.value });
  }

  handleSubmit(event) {
    axios
      .get(`http://localhost:5000/${this.state.selectedCity}`)
      .then((res) => {
        const weatherData = res.data.currentWeatherData;
        const mapData = res.data.mapData;
        this.setState({ selectedCity: "", weatherData, mapData });
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="Search"
            value={this.state.selectedCity}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Search</button>
        </form>
        <p>{this.state.mapData.text}</p>
        <FeelsLike data={this.state.weatherData.feels_like} />
        <Condition data={this.state.weatherData.humidity} />
      </div>
    );
  }
}
