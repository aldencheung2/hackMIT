// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

var data = {};

async function analyze(text){
    try {
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
        // data1[key]['avgSalience'] = data1[key]['totalSalience']/data1[key]['count'];
        relatedSubjects.push({name: key, salience: data1[key]['totalSalience']});
    }

    function salienceComparator(a, b){
        return a.salience - b.salience;
    }

    data1['relatedSubjects'] = relatedSubjects.sort(salienceComparator).reverse();
    return data1;
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
    await Promise.all(myJson['data'].map(async (input) => {
        await analyze(input['text']);
    }));
    // for(let input of myJson['data']){
    //     await analyze(input['text']);
    // }
    // console.log(data);
    return data;
}
// startTime and endTime is in ISO 8601
// startTime is the oldest tweet, endTime is most recent
// TODO set start and end time for tweets
async function getTweets (term, num, startTime, endTime) {
    data = {};
    let apiString = 'https://api.twitter.com/2/tweets/search/recent?query=%22' + term + '%22%20-is%3Aretweet&max_results=' + num + '&tweet.fields=created_at,public_metrics&expansions=entities.mentions.username&sort_order=relevancy';
    if(startTime != undefined){
        apiString += '&start_time=' + startTime;
    }
    if(endTime != undefined){
        apiString += '&end_time=' + endTime;
    }
    const response = await fetch(apiString,
    {
        headers:{
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAEHMhgEAAAAABGmQmPZGpdlv5MXacZeb%2BmAQQXw%3DGnhVwzX7PaLUXMRmZt6sWDjwrHUUnBGvQhQhvAkOOsos9VqD1n"
        }
    });
    const myJson = await response.json(); //extract JSON from the http response

    let data1 = await analyzeEach(myJson);
    
    let result = await postProcess(data1);
    console.log(result);   
}

getTweets('joe%20biden', 10);