import React from "react";
import "chartjs-adapter-luxon";

import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Line Chart</h2>
      <Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Current price of apple stock",
            },
            legend: {
              display: true,
            },
          },
          scales: {
            x: {
              type: "time",
              time: {
                // Luxon format string
                tooltipFormat: "DD T",
              },
              title: {
                display: true,
                text: "Date",
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
  );
}
export default LineChart;
