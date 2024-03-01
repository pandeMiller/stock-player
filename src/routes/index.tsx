import React from "react";
import PathConstants from "./PathConstants";

const Home = React.lazy(() => import("../components/ChooseStockGraph"));
const About = React.lazy(() => import("../pages/About"));
const Query = React.lazy(() => import("../pages/Query"));
const routes = function (stockDataListMap) {
  return [
    {
      path: PathConstants.HOME,
      element: <Home stockDataMap={stockDataListMap} />,
    },
    { path: PathConstants.QUERY, element: <Query /> },
    { path: PathConstants.ABOUT, element: <About /> },
  ];
};

export default routes;
