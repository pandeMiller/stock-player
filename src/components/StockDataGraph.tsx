import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import "chartjs-adapter-luxon";

import LineChart from "./LineChart";
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
export default function StockDataGraph({
  o,
  h,
  l,
  c,
  pc,
  d,
  dp,
  timeForEvent,
}: StockData) {
  const graphWindowSize = 5;
  const [data_list, setDataList] = useState([
    {
      o: 0.0,
      h: 0.0,
      l: 0.0,
      c: 0.0,
      pc: 0.0,
      d: 0.0,
      dp: 0.0,
    },
  ]);
  const [time, setTime] = useState([DateTime.now().toJSDate()]);
  let chartData = {
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

  function onNewData(o, h, l, c, pc, d, dp, timeForEvent) {
    if (data_list.length > graphWindowSize) {
      const newDataList = data_list.slice(1, data_list.length);
      const newTime = time.slice(1, time.length);
      setDataList(newDataList);
      console.log("reduced");
      console.log(newDataList.length);
      setTime(newTime);
      setDataList([
        ...newDataList,
        {
          o,
          h,
          l,
          c,
          pc,
          d,
          dp,
        },
      ]);
      setTime([...newTime, timeForEvent]);
    } else {
      setDataList([
        ...data_list,
        {
          o,
          h,
          l,
          c,
          pc,
          d,
          dp,
        },
      ]);
      setTime([...time, timeForEvent]);
    }

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
    console.log("calling on New Data");
    onNewData(o, h, l, c, pc, d, dp, timeForEvent);
    console.log(data_list);
  }, [o, h, l, c, pc, d, dp, timeForEvent]);
  return <LineChart chartData={chartData} />;
}
