import React from "react";
import axios from "axios";
import "./styles/reset.css";
import "./styles/index.css";
import Currently from "./components/Currently";
import Hourly from "./components/Hourly";
import Daily from "./components/Daily";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCity: "chicago",
      currently: [],
      hourly: [],
      daily: [],
      alerts: [],
      mapData: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData() {
    setTimeout(() => {
      axios
        .get(`http://localhost:5000/${this.state.selectedCity}`)
        .then((res) => {
          const currently = res.data.currentWeatherData;
          const hourly = res.data.hourlyWeatherData;
          const daily = res.data.dailyWeatherData;
          const alerts = res.data.weatherAlerts;
          const mapData = res.data.mapData;
          this.setState({ currently, hourly, daily, alerts, mapData });
        });
      console.log("got data");
    }, 1000);
  }

  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchData, 300000); // runs every 5 minutes.
  }

  handleChange(event) {
    this.setState({ selectedCity: event.target.value });
  }

  handleSubmit(event) {
    this.fetchData(this.state.selectedCity);
    event.preventDefault();
  }

  render() {
    if (!this.state.currently.weather) {
      return (
        <div className="loading-screen">
          <span>Loading</span>
        </div>
      );
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
        <div className="section">
          <Hourly data={this.state.hourly} />
        </div>

        <h1>5 Day Outlook</h1>
        <div className="section">
          <Daily data={this.state.daily} />
        </div>

        <footer>
          <p>&copy; 2020 Brady Vossler 🤠</p>
        </footer>
      </div>
    );
  }
}
