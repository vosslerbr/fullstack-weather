import React from "react";
import axios from "axios";
import Currently from "./components/Currently";
import Hourly from "./components/Hourly";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCity: "",
      currently: [],
      hourly: [],
      daily: [],
      alerts: [],
      mapData: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/chicago`).then((res) => {
      const currently = res.data.currentWeatherData;
      const hourly = res.data.hourlyWeatherData;
      const daily = res.data.dailyWeatherData;
      const alerts = res.data.weatherAlerts;
      const mapData = res.data.mapData;
      this.setState({ currently, hourly, daily, alerts, mapData });
    });
  }

  handleChange(event) {
    this.setState({ selectedCity: event.target.value });
  }

  handleSubmit(event) {
    axios
      .get(`http://localhost:5000/${this.state.selectedCity}`)
      .then((res) => {
        const currently = res.data.currentWeatherData;
        const hourly = res.data.hourlyWeatherData;
        const daily = res.data.dailyWeatherData;
        const alerts = res.data.weatherAlerts;
        const mapData = res.data.mapData;
        this.setState({
          selectedCity: "",
          currently,
          hourly,
          daily,
          alerts,
          mapData,
        });
      });
    event.preventDefault();
  }

  render() {
    if (!this.state.currently.weather) {
      return <span>Loading...</span>;
    }
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
        <h1>Right Now</h1>
        <Currently
          data={this.state.currently}
          currentCity={this.state.mapData}
        />
        <h1>Next 5 Hours</h1>
        <Hourly data={this.state.hourly} />
        <h1>5 Day Outlook</h1>
      </div>
    );
  }
}
