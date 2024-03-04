import { Container, Form } from "react-bootstrap";
import StockDataGraph from "./StockDataGraph";
import { useEffect, useState } from "react";
import NewStockDataGraph from "./NewStockDataGraph";

interface StockData {
  o: number;
  h: number;
  l: number;
  c: number;
  pc: number;
  d: number;
  dp: number;
  timeForEvent: object;
}
interface StockEventsForTicker {
  stockDataMap: StockData[];
}

export default function ChooseStockGraph({
  stockDataMap,
}: StockEventsForTicker) {
  //sorted
  const fanangTickerSymbols = ["AAPL", "AMZN", "GOOG", "META", "NFLX"];
  const [faangStockData, setFaangStockData] = useState({});
  const [selectedTicker, setSelectedTicker] = useState(null);
  useEffect(() => {
    setFaangStockData(stockDataMap);
    console.log("logging faangStockData");
    console.log(stockDataMap);
  }, [stockDataMap]);

  function selectTicker(event) {
    setSelectedTicker(event.target.value);
  }
  return (
    <>
      <Container className="mt-3">
        <Form.Select
          aria-label="Default select example"
          onChange={selectTicker}
        >
          <option>Open this select menu</option>
          {fanangTickerSymbols.map((symbol) => (
            <option>{symbol}</option>
          ))}
        </Form.Select>
        {selectedTicker && (
          <NewStockDataGraph
            stockDataList={faangStockData[selectedTicker]}
          ></NewStockDataGraph>
        )}
      </Container>
    </>
  );
}
