// Imports the Google Cloud client library
const language = require("@google-cloud/language");
// Creates a client
const client = new language.LanguageServiceClient();

export default async function handler(req, res) {
  var data = {};
  async function analyze(text) {
    try {
      const document = {
        content: text,
        type: "PLAIN_TEXT",
      };

      // Detects sentiment of entities in the document
      const [result] = await client.analyzeEntitySentiment({ document });
      const entities = result.entities;

      // console.log("Entities and sentiments:");
      entities.forEach((entity) => {
      //   console.log(`  Name: ${entity.name}`);
      //   console.log(`  Type: ${entity.type}`);
      //   console.log(`  Score: ${entity.sentiment.score}`);
      //   console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
        if (entity.name in data) {
          data[entity.name]["totalScore"] += entity.sentiment.score;
          data[entity.name]["totalMagnitude"] += entity.sentiment.magnitude;
          data[entity.name]["totalSalience"] += entity.salience;
          data[entity.name]["count"] += 1;
        } else {
          data[entity.name] = {};
          data[entity.name]["type"] = entity.type;
          data[entity.name]["totalScore"] = entity.sentiment.score;
          data[entity.name]["totalMagnitude"] = entity.sentiment.magnitude;
          data[entity.name]["totalSalience"] = entity.salience;
          data[entity.name]["mid"] = entity.metadata.mid; // https://cloud.google.com/natural-language/docs/basics#sentiment-analysis-values
          data[entity.name]["count"] = 1;
        }
      });
    } catch (error) {
      console.log(error);
    }
    return data;
  }

  async function postProcess(data1) {
    let relatedSubjects = [];
    for (var key of Object.keys(data1)) {
      data1[key]["avgScore"] = data1[key]["totalScore"] / data1[key]["count"];
      data1[key]["avgMagnitude"] =
        data1[key]["totalMagnitude"] / data1[key]["count"];
      // data1[key]['avgSalience'] = data1[key]['totalSalience']/data1[key]['count'];
      relatedSubjects.push({
        name: key,
        salience: data1[key]["totalSalience"],
      });
    }

    function salienceComparator(a, b) {
      return a.salience - b.salience;
    }

    data1["relatedSubjects"] = relatedSubjects
      .sort(salienceComparator)
      .reverse();
    // console.log(data1["Elon Musk"]);
    return data1;
  }

  async function analyzeEach(myJson) {
    await Promise.all(
      myJson["data"].map(async (input) => {
        await analyze(input["text"]);
      })
    );

    return data;
  }

  // startTime and endTime is in ISO 8601
  // startTime is the oldest tweet, endTime is most recent
  // TODO set start and end time for tweets
  async function getTweets(term, num, startTime, endTime) {
    data = {};
    let apiString =
      "https://api.twitter.com/2/tweets/search/recent?query=" +
      term +
      "%20-is%3Aretweet%20lang%3Aen&max_results=" +
      num +
      "&tweet.fields=created_at,public_metrics&sort_order=relevancy";
    if (startTime != undefined) {
      apiString += "&start_time=" + startTime;
    }
    if (endTime != undefined) {
      apiString += "&end_time=" + endTime;
    }
    let response = await fetch(apiString, {
      headers: {
        Authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAAB%2FNhgEAAAAAqSree%2FFvjf%2Br4hTwJ4813w5nTsU%3Dfa1IiGOcy6U1mKUtjGqsuD35WfHftazUaX3lXcTupzvqkWTCj3",
      },
    });
    const myJson = await response.json(); // extract JSON from the http response
    let data1 = await analyzeEach(myJson);

    let result = await postProcess(data1);

    // const sentiments = {
    //   mainEntity: result[term],
    //   sideEntities: [result].filter((entity) => entity !== term),
    // };
    let tweetId;
    if (startTime) {
      console.log(myJson);
      tweetId = myJson.data[0].id;
    }
    const sentiments = {
      mainEntity: result[term],
      startTime,
      endTime,
      tweetId,
    };
    // console.log(sentiments.mainEntity);

    return sentiments;
  }

  function subtractSeconds(numOfSeconds, date = new Date()) {
    date.setSeconds(date.getSeconds() - numOfSeconds);

    return date;
  }

  function getPastSevenDays() {
    let pastSevenDays = [];

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

  async function runGetTweetsForSevenDays() {
    let pastSevenDaysArray = getPastSevenDays();
    // const resultsArray = pastSevenDaysArray.map((day) => {
    //   return getTweets(req.body.person, 10, day.startTime, day.endTime);
    // });
    // let resultsArray = [];
    // for (var i = 0; i < pastSevenDaysArray.length; i++){
    //   getTweets(req.body.person, 10, pastSevenDaysArray[i].startTime, pastSevenDaysArray[i].endTime);
    // }
    // let resultsArray = pastSevenDaysArray.map((day) => {
    //   console.log(day)
    //   return getTweets(req.body.person, 10, day.startTime, day.endTime);
    // });

    // const results = await Promise.all(
    //   pastSevenDaysArray.map(async (day) => {
    //     await getTweets(req.body.person, 10, day.startTime, day.endTime);
    //   })
    // );
    
    let results = [];
    for (let i = 0; i < pastSevenDaysArray.length; i++){
      let r = await getTweets(req.body.person, 10, pastSevenDaysArray[i].startTime, pastSevenDaysArray[i].endTime);
      results.push(r);
    }
    
    // const results = await Promise.all(resultsArray);
    // console.log(resultsArray);
    // console.log(pastSevenDaysArray);
    res.status(200).json(results);
  }

  try {
    /**
     * Make sure the input for the name is Upper cased!!! like Joe Biden, not joe biden
     */

    if (req.body.isIndividual) {
      runGetTweetsForSevenDays();
    } else {
      const result = await getTweets(req.body.person, 10);
      res.status(200).json(result);
    }
  } catch (error) {
    console.log("ERROR");
    console.log(error);
    res.status(500).send(error);
  }
}
