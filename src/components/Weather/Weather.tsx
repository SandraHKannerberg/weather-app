import axios from "axios";
import { useState } from "react";
import "./Weather.css";
import { Container, Col, Row, Form, InputGroup } from "react-bootstrap";

//Interface for weather-data
interface WeatherData {
  name?: string;
  weather?: { icon: string; main: string }[];
  main?: { temp: number; feels_like: number; humidity: number };
  wind?: { speed: number } | undefined;
}

//Interface for weather-icon
interface WeatherIconProps {
  iconCode: string;
}

interface ForecastData {
  dayOfWeek: string;
  temperature: string;
  icon: any;
}

//Component for weather-icon
const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }) => {
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  return <img src={iconUrl} alt="Weather Icon" className="weather-icon" />;
};

function Weather() {
  const [data, setData] = useState<WeatherData>({});
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [location, setLocation] = useState("");

  //Url for the current day
  const urlCurrentDay = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  //Url for 5 days
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Fetch Current day
      axios.get(urlCurrentDay).then((res) => {
        setData(res.data);
        console.log(res.data);
      });

      // Fetch 3 days forecast
      axios.get(urlForecast).then((res) => {
        // Filter 3 days forecast
        const nextThreeDaysForecast = res.data.list.slice(0, 8 * 3);

        // Average temperatures
        const averageTemperatures = [];
        for (let i = 0; i < nextThreeDaysForecast.length; i += 8) {
          const dailyForecast = nextThreeDaysForecast.slice(i, i + 8);
          const totalTemperature = dailyForecast.reduce(
            (sum, item) => sum + item.main.temp,
            0
          );
          const averageTemperature = totalTemperature / 8;
          const date = new Date(dailyForecast[0].dt * 1000);
          const dayOfWeek = date.toLocaleDateString("en-US", {
            weekday: "short",
          });

          averageTemperatures.push({
            dayOfWeek,
            temperature: averageTemperature.toFixed(1),
            icon: dailyForecast[0].weather[0].icon,
          });
        }

        // Update forecast state
        setForecast(averageTemperatures);
      });

      //Clear input after Enter
      setLocation("");
    }
  };

  return (
    <>
      <Container className="search-container">
        <InputGroup className="search-location">
          <Form.Control
            className="input-location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder="Enter a location..."
          />
        </InputGroup>
      </Container>
      <Container className="weather-container">
        {data.name != undefined && (
          <Row className="weatherdetails-top">
            <Col className="location">
              <p className="weatherdetails-p">
                {/* Display location */}
                {data.name}
              </p>
              {/* Weather description - icon */}
              {data.weather ? (
                <WeatherIcon iconCode={data.weather[0].icon} />
              ) : null}
            </Col>
            {/* Display temperature */}
            <Col className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}&deg;C</h1> : null}
            </Col>
            {/* Text - Today */}
            <Col className="today">
              <p className="weatherdetails-p">Today</p>
            </Col>
          </Row>
        )}

        {/* Weather details if a location is written */}
        {data.name != undefined && (
          <Row className="weatherdetails-bottom">
            {/* Temp feels like ... */}
            <Col className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}&deg;C</p>
              ) : null}
              <p>Feels like</p>
            </Col>
            {/* Humidity */}
            <Col className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </Col>
            {/* Wind speed */}
            <Col className="wind">
              {data.main ? (
                <p className="bold">
                  {data.wind && data.wind.speed.toFixed()} MPH
                </p>
              ) : null}
              <p>Wind speed</p>
            </Col>
          </Row>
        )}

        {/* Weather Forecast */}
        {forecast.length > 0 && (
          <Container className="forecast-container">
            <Row>
              <p>Weather Forecast</p>
            </Row>
            <Row className="forecast">
              {forecast.map((dailyForecast, index) => (
                <Col className="center-content" key={index}>
                  <img
                    src={`http://openweathermap.org/img/w/${dailyForecast.icon}.png`}
                    alt="Weather Icon"
                  />
                  <p>{dailyForecast.temperature}&deg;C</p>
                  <p className="bold">{dailyForecast.dayOfWeek}</p>
                </Col>
              ))}
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
}

export default Weather;
