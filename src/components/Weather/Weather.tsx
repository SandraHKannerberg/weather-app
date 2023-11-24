import axios from "axios";
import { useState } from "react";
import "./Weather.css";
import { Container, Col, Row } from "react-bootstrap";

function Weather() {
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=${process.env.REACT_APP_API_KEY}`;

  return (
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
  );
}

export default Weather;
