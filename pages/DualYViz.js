import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  [
    { type: "date", label: "Day" },
    { type: "number", label: "Average temperature" },
    "Average hours of daylight",
    "ThirdMeasurement",
  ],
  [new Date(2014, 0), -0.5, 5.7, 1],
  [new Date(2014, 1), 0.4, 8.7, 1],
];

export const options = {
  chart: {
    title: "Average Temperatures and Daylight in Iceland Throughout the Year",
  },
  width: 900,
  height: 500,
  series: {
    // Gives each series an axis name that matches the Y-axis below.
    0: { axis: "Temps" },
    1: { axis: "Daylight" },
    2: { axis: "third" },
  },
  axes: {
    // Adds labels to each axis; they don't have to match the axis names.
    y: {
      Temps: { label: "Temps (Celsius)" },
      Daylight: { label: "Daylight" },
      third: { label: "Third" },
    },
  },
};

export default function App() {
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
