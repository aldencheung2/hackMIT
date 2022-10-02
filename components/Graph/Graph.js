import React from "react";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import axios, { Axios } from "axios";
// import stocks from "./test.json";

export const options = {
  chart: {
    title: "Trends",
  },
  width: 900,
  height: 500,
  series: {
    // Gives each series an axis name that matches the Y-axis below.
    0: { axis: "Temps" },
    1: { axis: "Daylight" },
  },
  axes: {
    // Adds labels to each axis; they don't have to match the axis names.
    y: {
      Temps: { label: "Stock" },
      Daylight: { label: "Sentiment" },
    },
  },
};

const DualGraph = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const getData = () => {};
    let stock = "NKE";
    if (stock != undefined) {
      // // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo
      const getData = async () => {
        const beginString =
          "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
        const endString = "&interval=5min&apikey=N3GPUAQX5ZZBX9KH";
        const stockVal = beginString + stock + endString;
        const response = await axios.get(stockVal);
        const myJson = await response.data;
        console.log(myJson);
        let values = myJson;
        let dailyClose = [];
        for (let i = 25; i < 31; i++) {
          let numVal = i;
          let text;
          if (i < 10) {
            text = "0" + numVal.toString();
          } else {
            text = numVal.toString();
          }
          let day = "2022-09-" + text;
          if (
            values != undefined &&
            values["Time Series (Daily)"] != undefined &&
            values["Time Series (Daily)"][day] !== undefined
          ) {
            dailyClose.push({
              Date: new Date(day),
              Stock: values["Time Series (Daily)"][day]["4. close"],
            });
            console.log(
              stock + " " + values["Time Series (Daily)"][day]["4. close"]
            );
          }
        }

        let newURI =
          "https://finnhub.io/api/v1/quote?symbol=" +
          stock +
          "&token=ccs93paad3ifi21da5h0ccs93paad3ifi21da5hg";

        let newResponse = await axios(newURI);
        let newData = await newResponse.data;

        dailyClose.push({
          Date: new Date(),
          Stock: newData["c"],
        });
        setStocks(dailyClose);
      };
      getData();
    }
  }, []);

  let data = [
    [
      { type: "date", label: "Day" },
      { type: "number", label: "StockPrice" },
      "Sentiment",
    ],
  ];

  // stocks.forEach((dataPoint) => {
  // });

  console.log(stocks);

  stocks.forEach((dataPoint) => {
    data.push([new Date(dataPoint["Date"]), dataPoint["Stock"], 10]);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        height: "100vh",
        width: "100%",
      }}
    >
      <Chart
        chartType="Line"
        width="50%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default DualGraph;

//getStockValue("IBM");
// let data = [
//   [
//     { type: "date", label: "Day" },
//     { type: "number", label: "Sentiment" },
//     "StockPrice",
//   ],
//   [new Date(2014, 0), -0.5, 5.7],
//   [new Date(2014, 1), 0.4, 8.7],
// ];
