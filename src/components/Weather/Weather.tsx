import axios from "axios";
import { ChangeEvent, useState } from "react";
import "./Weather.css";
import { Container, Col, Row, Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
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
            <p>Stockholm</p>
          </Col>
          <Col className="temp">
            <h1>3&deg;C</h1>
          </Col>
          <Col className="description">
            <p>Clouds</p>
          </Col>
        </Row>

        <Row className="weatherdetails-bottom">
          <Col className="feels">
            <p className="bold">4&deg;C</p>
            <p>Feels like</p>
          </Col>
          <Col className="humidity">
            <p className="bold">20%</p>
            <p>Humidity</p>
          </Col>
          <Col className="wind">
            <p className="bold">12 MPH</p>
            <p>Wind speed</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Weather;
