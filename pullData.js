// startTime and endTime is in ISO 8601
// startTime is the oldest tweet, endTime is most recent
// TODO set start and end time for tweets
async function getTweets(term, num, startTime, endTime) {
  data = {};
  let apiString =
    'https://api.twitter.com/2/tweets/search/recent?query="' +
    term +
    '"%20-is%3Aretweet&max_results=' +
    num +
    "&user.fields=&expansions=entities.mentions.username";
  let tempApiString =
    'https://api.twitter.com/2/tweets/search/recent?query="' +
    term +
    '"%20-is%3Aretweet&max_results=' +
    num +
    "&expansions=author_id";
  if (startTime != undefined) {
    apiString += "&start_time=" + startTime;
  }
  if (endTime != undefined) {
    apiString += "&end_time=" + endTime;
  }
  const response = await fetch(tempApiString, {
    headers: {
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAEHMhgEAAAAABGmQmPZGpdlv5MXacZeb%2BmAQQXw%3DGnhVwzX7PaLUXMRmZt6sWDjwrHUUnBGvQhQhvAkOOsos9VqD1n",
    },
  });
  const myJson = await response.json(); //extract JSON from the http response

  // let data1 = await analyzeEach(myJson);

  // let result = await postProcess(data1);

  const username = myJson.data[4].author_id
  const tweetId = myJson.data[4].id;
  console.log("url", "www.twitter.com/" + username + "/status/" + tweetId);
}

getTweets("Joe Biden", 10);
