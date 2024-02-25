import React from "react";
import "chartjs-adapter-luxon";

import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="container">
      <div className="chart-container">
        <h2 style={{ textAlign: "center", color: "blue" }}>
          FAANG's stock prices
        </h2>
        <Line
          data={chartData}
          options={{
            // plugins: {
            //   legend: {
            //     display: true,
            //   },
            // },
            scales: {
              x: {
                type: "time",
                time: {
                  // Luxon format string
                  tooltipFormat: "DD T",
                },
                title: {
                  display: true,
                  text: "Time",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Price",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
export default LineChart;
