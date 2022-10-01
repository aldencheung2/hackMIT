// // Imports the Google Cloud client library
// const language = require('@google-cloud/language');

// // Creates a client
// const client = new language.LanguageServiceClient();

// /**
//  * TODO(developer): Uncomment the following lines to run this code
//  */
// // const bucketName = 'Your bucket name, e.g. my-bucket';
// // const fileName = 'Your file name, e.g. my-file.txt';

// // Prepares a document, representing a text file in Cloud Storage
// const document = {
//   gcsContentUri: `gs://${bucketName}/${fileName}`,
//   type: 'PLAIN_TEXT',
// };

// // Detects the sentiment of the document
// const [result] = await client.analyzeSentiment({document});

// const sentiment = result.documentSentiment;
// console.log('Document sentiment:');
// console.log(`  Score: ${sentiment.score}`);
// console.log(`  Magnitude: ${sentiment.magnitude}`);

// const sentences = result.sentences;
// sentences.forEach(sentence => {
//   console.log(`Sentence: ${sentence.text.content}`);
//   console.log(`  Score: ${sentence.sentiment.score}`);
//   console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
// });
async function test(){

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following line to run this code.
 */
const text = "Joe Biden has crashed the stock market, bottomed out 401k's, brought record inflation, sold us out to China, wrecked the middle class, called Americans who disagree with him domestic terrorists and brought us to the brink of WWIII. What EXACTLY are you libs so proud of?";

// Prepares a document, representing the provided text
const document = {
  content: text,
  type: 'PLAIN_TEXT',
};

// Detects the sentiment of the document
const [result] = await client.analyzeSentiment({document});

const sentiment = result.documentSentiment;
console.log('Document sentiment:');
console.log(`  Score: ${sentiment.score}`);
console.log(`  Magnitude: ${sentiment.magnitude}`);

const sentences = result.sentences;
sentences.forEach(sentence => {
  console.log(`Sentence: ${sentence.text.content}`);
  console.log(`  Score: ${sentence.sentiment.score}`);
  console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
});
}

test();