import React from "react";

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
            scales: {
              x: {
                type: "time",
                time: {
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
