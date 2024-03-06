import { Container, Form } from "react-bootstrap";
import StockDataGraph from "./StockDataGraph";
import { useEffect, useState } from "react";
import NewStockDataGraph from "./NewStockDataGraph";

export enum chooseStockGraphTestIds {
  CHOOSE_STOCK_GRAPH_TOP_NAVBAR_TEST_ID = "home-top-nav-bar",
}
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
  }, [stockDataMap]);

  function selectTicker(event) {
    setSelectedTicker(event.target.value);
  }
  return (
    <>
      <Container data-testid="home-top-nav-bar" className="mt-3">
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
