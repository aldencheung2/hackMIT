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

const DualGraph = (props) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const getData = () => {};
    let stock = "TSLA";
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
            // console.log(
            //   stock + " " + values["Time Series (Daily)"][day]["4. close"]
            // );
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
  console.log(props.sentiments);

  const sents = props.sentiments;

  function subtractSeconds(numOfSeconds, date = new Date()) {
    date.setSeconds(date.getSeconds() - numOfSeconds);

    return date;
  }

  function getPastSevenDays() {
    const pastSevenDays = [];

    for (let i = 7; i > 0; i--) {
      const startTime = new Date(new Date().setDate(new Date().getDate() - i));
      const startTimeCloned = new Date(startTime.valueOf());
      const endTime = subtractSeconds(
        10,
        new Date(startTimeCloned.setDate(startTimeCloned.getDate() + 1))
      );
      pastSevenDays.push({
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });
    }

    return pastSevenDays;
  }

  let pastDates = getPastSevenDays();

  let counter = 0;

  console.log(props.sentiments);

  // props.sentiments.forEach((sents) => {
  //   // data.push([pastDates[counter], sents.mainEntity.avgScore, 1]);
  //   data.push([new Date(pastDates[counter].endTime), sents.mainEntity.avgScore, 1]);
  //   // data.push([counter, sents.mainEntity.avgScore, 1]);
  //   counter++;
  // });

  // console.log(stocks);

  stocks.forEach((dataPoint) => {
    data.push([new Date(dataPoint["Date"]), dataPoint["Stock"], props.sentiments[counter].mainEntity.avgScore*100]);
    counter++;
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
