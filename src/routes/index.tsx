import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../components/StockDataGraph"));
// other page components...
const About = React.lazy(() => import("../pages/About"));

const routes = function (a, b, c, d, e, f, g, timeFoEvent) {
  return [
    {
      path: PathConstants.HOME,
      element: (
        <Home
          o={a}
          h={b}
          l={c}
          c={d}
          pc={e}
          d={f}
          dp={g}
          timeForEvent={timeFoEvent}
        />
      ),
    },
    // other mappings ...
    { path: PathConstants.ABOUT, element: <About /> },
  ];
};

export default routes;
