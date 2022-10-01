// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

var data = {};

async function analyze(text){
    try{
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
            data[entity.name]['totalScore'] += entity.sentiment.score;
            data[entity.name]['totalMagnitude'] += entity.sentiment.magnitude;
            data[entity.name]['totalSalience'] += entity.salience;
            data[entity.name]['count'] += 1;
        }else{
            data[entity.name] = {};
            data[entity.name]['type'] = entity.type;
            data[entity.name]['totalScore'] = entity.sentiment.score;
            data[entity.name]['totalMagnitude'] = entity.sentiment.magnitude;
            data[entity.name]['totalSalience'] = entity.salience;
            data[entity.name]['mid'] = entity.metadata.mid;     // https://cloud.google.com/natural-language/docs/basics#sentiment-analysis-values
            data[entity.name]['count'] = 1;
        }
    });
    } catch(error) {
        console.log(error);
    }
    return data;
}

async function postProcess(data1){
    let relatedSubjects = [];
    for (var key of Object.keys(data1)) {
        data1[key]['avgScore'] = data1[key]['totalScore']/data1[key]['count'];
        data1[key]['avgMagnitude'] = data1[key]['totalMagnitude']/data1[key]['count'];
        data1[key]['avgSalience'] = data1[key]['totalSalience']/data1[key]['count'];
        relatedSubjects.push({name: key, salience: data1[key]['avgSalience']});
    }

    function salienceComparator(a, b){
        return a.salience - b.salience;
    }

    data1['relatedSubjects'] = relatedSubjects.sort(salienceComparator).reverse();
    console.log(data1);
    return 0;
}

// async function processData(myJson){
//     data = {};
//     myJson['data'].forEach((input)=>{
//             data = analyze(input['text'], data);        
//         }
//     )
//     console.log(data);
//     return data;
// }

async function analyzeEach(myJson){
    myJson['data'].forEach((input)=>{
        analyze(input['text']);
        // totalText += " " + input['text']
    });
    console.log(data);
    return data;
}

async function getTweets () {
    const response = await fetch('https://api.twitter.com/2/tweets/search/recent?query=%22joe%20biden%22%20-is%3Aretweet&max_results=12&tweet.fields=created_at,public_metrics&expansions=entities.mentions.username',
    {
        headers:{
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAEHMhgEAAAAABGmQmPZGpdlv5MXacZeb%2BmAQQXw%3DGnhVwzX7PaLUXMRmZt6sWDjwrHUUnBGvQhQhvAkOOsos9VqD1n"
        }
    });
    const myJson = await response.json(); //extract JSON from the http response

    let data1 = await analyzeEach(myJson);
    
    let result = await postProcess(data1);
    console.log(result);
    // console.log(data);
    // fetch('https://api.twitter.com/2/tweets/search/recent?query=%22joe%20biden%22%20-is%3Aretweet&max_results=12&tweet.fields=created_at,public_metrics&expansions=entities.mentions.username',
    // {
    //     headers:{
    //         "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAEHMhgEAAAAABGmQmPZGpdlv5MXacZeb%2BmAQQXw%3DGnhVwzX7PaLUXMRmZt6sWDjwrHUUnBGvQhQhvAkOOsos9VqD1n"
    //     }
    // }).then((response) => {
    //         return response.json(); //extract JSON from the http response
    //     }
    // ).then((myJson) => {
    //     processData(myJson);
    // })
    // .then((data1) => {
    //         postProcess(data1)
    //     }
    // );

    
    
}

  getTweets();