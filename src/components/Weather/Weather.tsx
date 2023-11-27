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

//Component for weather-icon
const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode }) => {
  const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  return <img src={iconUrl} alt="Weather Icon" className="weather-icon" />;
};

function Weather() {
  const [data, setData] = useState<WeatherData>({});
  const [forecast, setForecast] = useState({});
  const [location, setLocation] = useState("");

  //Url for the current day
  const urlCurrentDay = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  //Url for 5 days
  const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  //Function for search a location and then press ENTER
  const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      axios.get(urlCurrentDay).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
      axios.get(urlForecast).then((res) => {
        setForecast(res.data);
        console.log(res.data, " next-days");
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
            {/* Weather description - text */}
            <Col className="description">
              {/* {data.weather ? (
              <p className="weatherdetails-p">{data.weather[0].main}</p>
            ) : null} */}
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

        {/* Weather Forecast*/}
        <Container>
          <Row>
            <p>Weather Forecast</p>
          </Row>
          <Row className="forecast">
            <Col>Day 1</Col>
            <Col>Day 2</Col>
            <Col>Day 3</Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Weather;
