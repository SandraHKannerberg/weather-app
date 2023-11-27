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
      axios.get(urlCurrentDay).then((res) => {
        setData(res.data);
        console.log(res.data);
      });

      axios.get(urlForecast).then((res) => {
        // Filtrera ut de tre kommande dagarna från 5-dagars prognosen
        const nextThreeDaysForecast = res.data.list.slice(0, 8 * 3);

        // Beräkna snitttemperaturen för varje dag
        const averageTemperatures = [];
        for (let i = 0; i < nextThreeDaysForecast.length; i += 8) {
          const dailyForecast = nextThreeDaysForecast.slice(i, i + 8);
          const totalTemperature = dailyForecast.reduce(
            (sum, item) => sum + item.main.temp,
            0
          );
          const averageTemperature = totalTemperature / 8;
          const date = new Date(dailyForecast[0].dt * 1000);
          const dayOfWeek = date.toLocaleDateString("sv-SE", {
            weekday: "long",
          });

          averageTemperatures.push({
            dayOfWeek,
            temperature: averageTemperature.toFixed(1),
            icon: dailyForecast[0].weather[0].icon,
          });
        }

        // Uppdatera state med väderdata för 3-dagars prognos
        setForecast(averageTemperatures);
        console.log("Prognos ", averageTemperatures);
        console.log(res.data, " forecast");
      });

      //Clear input after Enter
      setLocation("");
    }
  };

  //Function for search a location and then press ENTER
  // const searchLocation = async (
  //   event: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   if (event.key === "Enter") {
  //     try {
  //       //Current day weather
  //       const currentDayResponse = await axios.get(urlCurrentDay);
  //       setData(currentDayResponse.data);

  //       // Forecast weather
  //       const forecastResponse = await axios.get(urlForecast);

  //       // Filter 3 days forecast
  //       const nextThreeDaysForecast = forecastResponse.data.list.slice(
  //         0,
  //         8 * 3
  //       );

  //       // Average temperature
  //       const averageTemperatures = nextThreeDaysForecast.map(
  //         (dailyForecast: any) => {
  //           const totalTemperature = dailyForecast.main.temp;
  //           const averageTemperature = totalTemperature;
  //           const date = new Date(dailyForecast.dt * 1000);
  //           const dayOfWeek = date.toLocaleDateString("sv-SE", {
  //             weekday: "long",
  //           });

  //           return {
  //             dayOfWeek,
  //             temperature: averageTemperature.toFixed(1),
  //             icon: dailyForecast[0].weather[0].icon,
  //           };
  //         }
  //       );

  //       setForecast(averageTemperatures);
  //       console.log(forecast);
  //     } catch (error) {
  //       console.error("Error fetching weather data:", error);
  //     }

  //     //Clear input after Enter
  //     setLocation("");
  //   }
  // };

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
      </Container>

      {/* Weather Forecast */}
      {forecast.length > 0 && (
        <Container>
          <Row>
            <p>Weather Forecast</p>
          </Row>
          <Row className="forecast">
            {forecast.map((dailyForecast, index) => (
              <Col key={index}>
                <img
                  src={`http://openweathermap.org/img/w/${dailyForecast.icon}.png`}
                  alt="Weather Icon"
                />
                {dailyForecast.temperature}°C - {dailyForecast.dayOfWeek}
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default Weather;
