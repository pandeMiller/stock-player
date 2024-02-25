// import ExerciseButtom from "./components/ExerciseButton";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import { DateTime } from "luxon";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import Layout from "./components/Layout";

import StockDataGraph from "./components/StockDataGraph";

Chart.register(CategoryScale);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvent, setFooEvent] = useState({
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
      setFooEvent(value);
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
  }, [fooEvent]);
  const router = createBrowserRouter([
    {
      element: <Layout />,
      // specify the routes defined in the
      // routing layer directly
      children: routes(
        fooEvent.o,
        fooEvent.h,
        fooEvent.l,
        fooEvent.c,
        fooEvent.pc,
        fooEvent.d,
        fooEvent.dp,
        timeEvent
      ),
    },
  ]);
  // return (
  //   <div className="App">
  //     <StockDataGraph
  //       o={fooEvent.o}
  //       h={fooEvent.h}
  //       l={fooEvent.l}
  //       c={fooEvent.c}
  //       pc={fooEvent.pc}
  //       d={fooEvent.d}
  //       dp={fooEvent.dp}
  //       timeForEvent={timeEvent}
  //     />
  //   </div>
  // );
  return <RouterProvider router={router} />;
}

export default App;
