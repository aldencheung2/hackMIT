// startTime and endTime is in ISO 8601
// startTime is the oldest tweet, endTime is most recent
// TODO set start and end time for tweets
async function getTweets(term, num, startTime, endTime) {
  data = {};
  let apiString =
    "https://api.twitter.com/2/tweets/search/recent?query=%22" +
    term +
    "%22%20-is%3Aretweet&max_results=" +
    num +
    "&tweet.fields=created_at,public_metrics&expansions=entities.mentions.username&sort_order=relevancy";
  if (startTime != undefined) {
    apiString += "&start_time=" + startTime;
  }
  if (endTime != undefined) {
    apiString += "&end_time=" + endTime;
  }
  const response = await fetch(apiString, {
    headers: {
      Authorization:
        "Bearer AAAAAAAAAAAAAAAAAAAAAEHMhgEAAAAABGmQmPZGpdlv5MXacZeb%2BmAQQXw%3DGnhVwzX7PaLUXMRmZt6sWDjwrHUUnBGvQhQhvAkOOsos9VqD1n",
    },
  });
  const myJson = await response.json(); //extract JSON from the http response
  console.log(myJson.data ? myJson.data[0].created_at: myJson.error);
}


