import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../components/StockDataGraph"));
const About = React.lazy(() => import("../pages/About"));
const Query = React.lazy(() => import("../pages/Query"));
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
    { path: PathConstants.QUERY, element: <Query /> },
    { path: PathConstants.ABOUT, element: <About /> },
  ];
};

export default routes;
