import { useState, useEffect } from "react";
import { DateTime } from "luxon";
// import "chartjs-adapter-luxon";

import LineChart from "./LineChart";
interface StockData {
  o: number;
  h: number;
  l: number;
  c: number;
  pc: number;
  d: number;
  dp: number;
  dt: Date;
}

interface StockDataList {
  stockDataList: StockData[];
}
export default function NewStockDataGraph({ stockDataList }: StockDataList) {
  const initVal: StockData = {
    o: 0.0,
    h: 0.0,
    l: 0.0,
    c: 0.0,
    pc: 0.0,
    d: 0.0,
    dp: 0.0,
    dt: DateTime.now().toJSDate(),
  };
  const [data_list, setDataList] = useState([initVal]);
  const [time, setTime] = useState([DateTime.now().toJSDate()]);
  const chartData = {
    labels: time,
    datasets: [
      {
        label: "Price",
        data: data_list.map((data) => data.c),
        borderColor: "blue",
        borderWidth: 2,
      },
    ],
  };

  function onNewData(newStockDataList: StockData[]) {
    console.log(newStockDataList);
    setDataList(newStockDataList);
    const timeList: Array<Date> = [];
    newStockDataList.map((sdl) => {
      timeList.push(sdl.dt);
    });
    setTime(timeList);
    console.log(time);

    chartData.labels = time;
    chartData.datasets = [
      {
        label: "Price",
        data: data_list.map((data) => data.c),
        borderColor: "blue",
        borderWidth: 2,
      },
    ];
  }
  useEffect(() => {
    onNewData(stockDataList);
    console.log(data_list);
  }, [stockDataList]);
  return <LineChart chartData={chartData} />;
}
