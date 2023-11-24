import axios from "axios";
import { useState } from "react";
import "./Weather.css";
import { Container, Col, Row } from "react-bootstrap";

function Weather() {
  //const url = `https://api.openweathermap.org/data/2.5/weather?q=stockholm&appid=${process.env.REACT_APP_API_KEY}`;

  return (
    <Container>
      <Row className="weatherdetails-top">
        <Col className="location">
          <p>Stockholm</p>
        </Col>
        <Col className="temp">
          <h1>
            3<sup className="celsius"> O</sup>C
          </h1>
        </Col>
        <Col className="description">
          <p>Clouds</p>
        </Col>
      </Row>
      <Row className="weatherdetails-bottom"></Row>
    </Container>
  );
}

export default Weather;
