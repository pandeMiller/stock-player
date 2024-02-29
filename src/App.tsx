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
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [quoteEvent, setquoteEvent] = useState({
    o: 0.0,
    h: 0.0,
    l: 0.0,
    c: 0.0,
    pc: 0.0,
    d: 0.0,
    dp: 0.0,
  });
  const [timeEvent, setTimeEvent] = useState(DateTime.now().toJSDate());

  useEffect(() => {
    function onConnect() {
      console.log("connected");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected");
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log(value);
      setquoteEvent(value);
      setTimeEvent(DateTime.now().toJSDate());
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("stockData", onFooEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("stockData", onFooEvent);
    };
  }, [quoteEvent]);
  const router = createBrowserRouter([
    {
      element: <Layout />,
      // specify the routes defined in the
      // routing layer directly
      children: routes(
        quoteEvent.o,
        quoteEvent.h,
        quoteEvent.l,
        quoteEvent.c,
        quoteEvent.pc,
        quoteEvent.d,
        quoteEvent.dp,
        timeEvent
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
