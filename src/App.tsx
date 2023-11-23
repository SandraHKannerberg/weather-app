import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./App.css";

function App() {
  return (
    <Container className="frosty-container">
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "1.5rem",
          padding: "10px",
        }}
      >
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <h1 className="title">
            Weather <span className="title-effect">app</span>
          </h1>
          <p className="info-text">
            Enter below a place you want to know the weather of and select an
            option from the dropdown
          </p>
        </Col>

        <InputGroup className="mb-3">
          <Form.Control
            style={{
              padding: "12px",
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
              border: "2px solid white",
            }}
          />
          <Button
            style={{
              padding: "12px",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
              border: "2px solid white",
              textTransform: "uppercase",
              background: 0,
              color: "white",
              fontWeight: "bold",
            }}
            variant="outline-light"
            id="button-addon2"
          >
            Select
          </Button>
        </InputGroup>
      </Row>
    </Container>
  );
}

export default App;
