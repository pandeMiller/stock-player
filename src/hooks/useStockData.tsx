import { useState, useEffect } from "react";
import axios from "axios";
interface RequestProps {
  symbol: string;
  startDate: string;
  endDate: string;
}
export interface StockDetails {
  id: string;
  createdAt: string;
  high: string;
  low: string;
  current: string;
}
export default function useStockData({
  symbol,
  startDate,
  endDate,
}: RequestProps) {
  const [stockData, setStockData] = useState<StockDetails[]>();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v0/stocks/".concat(symbol), {
        params: { startDate, endDate },
      })
      .then((response) => {
        setStockData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [startDate, endDate, symbol]);

  return stockData;
}
