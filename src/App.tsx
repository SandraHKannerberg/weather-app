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
          <h1>
            Weather{" "}
            <span style={{ fontWeight: "bold", textTransform: "uppercase" }}>
              app
            </span>
          </h1>
          <p style={{ textAlign: "center" }}>
            Enter below a place you want to know the weather of and select an
            option from the dropdown
          </p>
        </Col>

        <InputGroup className="mb-3">
          <Form.Control
            style={{
              padding: "10px",
              borderTopLeftRadius: "15px",
              borderBottomLeftRadius: "15px",
              border: 0,
            }}
          />
          <Button
            style={{
              padding: "10px",
              borderTopRightRadius: "15px",
              borderBottomRightRadius: "15px",
              border: 0,
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
