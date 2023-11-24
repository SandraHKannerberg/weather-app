import axios from "axios";
import { ChangeEvent, useState } from "react";
import "./Weather.css";
import { Container, Col, Row, Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${
    import.meta.env.VITE_API_KEY
  }`;

  const searchLocation = (event: any) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
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
            placeholder="Enter Location..."
          />
          {/* <Button className="search-btn">
            <Search></Search>
          </Button> */}
        </InputGroup>
      </Container>

      <Container className="weather-container">
        <Row className="weatherdetails-top">
          <Col className="location">
            <p className="weatherdetails-p">{data.name}</p>
          </Col>
          <Col className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}&deg;C</h1> : null}
          </Col>
          <Col className="description">
            {data.weather ? (
              <p className="weatherdetails-p">{data.weather[0].main}</p>
            ) : null}
          </Col>
        </Row>

        {data.name != undefined && (
          <Row className="weatherdetails-bottom">
            <Col className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}&deg;C</p>
              ) : null}
              <p>Feels like</p>
            </Col>
            <Col className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </Col>
            <Col className="wind">
              {data.main ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind speed</p>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Weather;
