import React from "react";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import axios, { Axios } from "axios";
// import stocks from "./test.json";

export const options = {
  chart: {
    title: "Trends",
  },
  width: 500,
  height: 300,
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
        // console.log(myJson);
        let values = myJson;
        let dailyClose = [];
        for (let i = 1; i < 31; i++) {
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
            // console.log(
            //   stock + " " + values["Time Series (Daily)"][day]["4. close"]
            // );
          }
        }
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

  // console.log(stocks);

  stocks.forEach((dataPoint) => {
    data.push([new Date(dataPoint["Date"]), dataPoint["Stock"], 10]);
  });

  return (
    <Flex boxShadow="base" width="min" p={16} flexDirection="column">
      <Heading size="md" my={3}>
        Stock vs Opinion
      </Heading>
      <Chart chartType="Line" data={data} options={options} />
    </Flex>
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
