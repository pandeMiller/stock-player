import { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import DataList from "./DataList";

function StockQueryParamsForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ticker, setTicker] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const tickers = ["AAPL", "GOOGL"];
  function handleStartDateChange(event) {
    setStartDate(event.target.value);
  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }
  function handleSelectedTicker(t) {
    setTicker(t.target.value);
  }

  return (
    <Container className="mt-4">
      <Form>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Select ticker</Form.Label>
              <Form.Select onChange={handleSelectedTicker}>
                <option>Select ticker</option>
                {tickers.map((ticker) => (
                  <option key={ticker} value={ticker}>
                    {ticker}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Start Datetime</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Start Datetime"
                onChange={handleStartDateChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>End Datetime</Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="End Datetime"
                onChange={handleEndDateChange}
              />
            </Form.Group>
          </Col>
          <Col className="mt-2">
            <Button
              className="mt-4"
              variant="primary"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      {submitted && (
        <DataList
          symbol={ticker}
          startDate={startDate.toString()}
          endDate={endDate.toString()}
          heading="Stock Prices"
        ></DataList>
      )}
    </Container>
  );
}

export default StockQueryParamsForm;
