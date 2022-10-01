// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

var data = {};

async function analyze(text){
    const document = {
    content: text,
    type: 'PLAIN_TEXT',
    };

    // Detects sentiment of entities in the document
    const [result] = await client.analyzeEntitySentiment({document});
    const entities = result.entities;

    console.log('Entities and sentiments:');
    entities.forEach(entity => {
        console.log(`  Name: ${entity.name}`);
        console.log(`  Type: ${entity.type}`);
        console.log(`  Score: ${entity.sentiment.score}`);
        console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
        if(entity.name in data){
            data[]
        }else{
            data[entity.name] = {};
            data[entity.name]['type'] = entity.type;
            data[entity.name]['totalScore'] = entity.sentiment.score;
            data[entity.name]['totalMagnitude'] = entity.sentiment.magnitude;
            data[entity.name]['totalSalience'] = entity.salience;
            data[entity.name]['mid'] = entity.metadata.mid;     // https://cloud.google.com/natural-language/docs/basics#sentiment-analysis-values
            data[entity.name]['count'] = entity
        }
    });
}



async function getTweets () {
    const response = await fetch('https://api.twitter.com/2/tweets/search/recent?query=%22joe%20biden%22%20-is%3Aretweet&max_results=12&tweet.fields=created_at,public_metrics&expansions=entities.mentions.username',
    {
        headers:{
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAEHMhgEAAAAABGmQmPZGpdlv5MXacZeb%2BmAQQXw%3DGnhVwzX7PaLUXMRmZt6sWDjwrHUUnBGvQhQhvAkOOsos9VqD1n"
        }
    });
    const myJson = await response.json(); //extract JSON from the http response
    // let totalText = ""
    myJson['data'].forEach((input)=>{
        analyze(input['text']);
        // totalText += " " + input['text']
    });

    // totalText.concat(" ", 'test----------------------------------------------------------');
    // console.log(totalText);
    // analyze(totalText); 
  }

  getTweets();