// import ExerciseButtom from "./components/ExerciseButton";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { DateTime } from "luxon";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import Layout from "./components/Layout";

const STOCK_DATA_EMIT_EVENT_NAME_AAPL = "stockDataAapl";
const STOCK_DATA_EMIT_EVENT_NAME_META = "stockDataMeta";
const STOCK_DATA_EMIT_EVENT_NAME_GOOG = "stockDataGoog";
const STOCK_DATA_EMIT_EVENT_NAME_AMZN = "stockDataAmzn";
const STOCK_DATA_EMIT_EVENT_NAME_NFLX = "stockDataNflx";

Chart.register(CategoryScale);

function App() {
  const initialValue = {
    o: 0.0,
    h: 0.0,
    l: 0.0,
    c: 0.0,
    pc: 0.0,
    d: 0.0,
    dp: 0.0,
    dt: DateTime.now().toJSDate(),
  };
  const windowSize = 5;
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [quoteEventsAapl, setQuoteEventsAapl] = useState([
    initialValue,
    initialValue,
    initialValue,
    initialValue,
    initialValue,
  ]);
  const [quoteEventsGoog, setQuoteEventsGoog] = useState([
    initialValue,
    initialValue,
    initialValue,
    initialValue,
    initialValue,
  ]);
  const [quoteEventsMeta, setQuoteEventsMeta] = useState([
    initialValue,
    initialValue,
    initialValue,
    initialValue,
    initialValue,
  ]);

  const [quoteEventsAmzn, setQuoteEventsAmzn] = useState([
    initialValue,
    initialValue,
    initialValue,
    initialValue,
    initialValue,
  ]);

  const [quoteEventsNflx, setQuoteEventsNflx] = useState([
    initialValue,
    initialValue,
    initialValue,
    initialValue,
    initialValue,
  ]);

  useEffect(() => {
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected");
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    function onApplQuoteEvent(value) {
      // setquoteEvent(value);
      value["dt"] = DateTime.now().toJSDate();
      console.log("on getting appl event");

      if (quoteEventsAapl.length >= windowSize) {
        const newDataList = quoteEventsAapl.slice(1, quoteEventsAapl.length);
        setQuoteEventsAapl([...newDataList, value]);
        // console.log(quoteEventsAapl);
      }
    }
    socket.on("stockDataAapl", onApplQuoteEvent);
    return () => {
      socket.off("stockDataAapl", onApplQuoteEvent);
    };
  }, [quoteEventsAapl]);

  useEffect(() => {
    function onGoogQuoteEvent(value) {
      value["dt"] = DateTime.now().toJSDate();
      console.log("on getting goog event");

      if (quoteEventsGoog.length >= windowSize) {
        const newDataList = quoteEventsGoog.slice(1, quoteEventsGoog.length);
        setQuoteEventsGoog([...newDataList, value]);
      }
    }
    socket.on("stockDataGoog", onGoogQuoteEvent);
    return () => {
      socket.off("stockDataGoog", onGoogQuoteEvent);
    };
  }, [quoteEventsGoog]);

  useEffect(() => {
    function onMetaQuoteEvent(value) {
      value["dt"] = DateTime.now().toJSDate();
      console.log("on getting meta event");

      if (quoteEventsMeta.length >= windowSize) {
        const newDataList = quoteEventsMeta.slice(1, quoteEventsMeta.length);
        setQuoteEventsMeta([...newDataList, value]);
      }
    }
    socket.on("stockDataMeta", onMetaQuoteEvent);
    return () => {
      socket.off("stockDataMeta", onMetaQuoteEvent);
    };
  }, [quoteEventsMeta]);

  useEffect(() => {
    function onAmznQuoteEvent(value) {
      value["dt"] = DateTime.now().toJSDate();
      console.log("on getting amzn event");

      if (quoteEventsAmzn.length >= windowSize) {
        const newDataList = quoteEventsAmzn.slice(1, quoteEventsAmzn.length);
        setQuoteEventsAmzn([...newDataList, value]);
      }
    }
    socket.on("stockDataAmzn", onAmznQuoteEvent);
    return () => {
      socket.off("stockDataAmzn", onAmznQuoteEvent);
    };
  }, [quoteEventsAmzn]);

  useEffect(() => {
    function onNflxQuoteEvent(value) {
      value["dt"] = DateTime.now().toJSDate();
      console.log("on getting nflx event");

      if (quoteEventsNflx.length >= windowSize) {
        const newDataList = quoteEventsNflx.slice(1, quoteEventsNflx.length);
        setQuoteEventsNflx([...newDataList, value]);
      }
    }
    socket.on("stockDataNflx", onNflxQuoteEvent);
    return () => {
      socket.off("stockDataNflx", onNflxQuoteEvent);
    };
  }, [quoteEventsNflx]);
  const router = createBrowserRouter([
    {
      element: <Layout />,
      // specify the routes defined in the
      // routing layer directly
      children: routes({
        AAPL: quoteEventsAapl,
        GOOG: quoteEventsGoog,
        META: quoteEventsMeta,
        AMZN: quoteEventsAmzn,
        NFLX: quoteEventsNflx,
      }),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
