import { Container, Flex, Heading, Text, Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Person from "../components/Person/Person";
import Graph from "../components/Graph/Graph";
import TweetEmbed from "react-tweet-embed";

export default function individualPage(props) {
  const [results, setResults] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const body = {
        person: props.person,
        isIndividual: true,
      };
      const result = await (await axios.put("api/hello", body)).data;
    //   console.log(result);
      setResults(result);
    };

    fetchData();
  }, []);

  if (results) {
    return (
      <Container width="100%" maxW="container.xl">
        <Navbar />
        <Heading m={10}>
          {props.person ? props.person : "Dummy Name"}: Public Opinion
        </Heading>

        <Flex height="md" justifyContent="space-around">
          <Person
            m={10}
            name = {""}
            sentiment={results ? results[6].mainEntity.avgScore : null}
            magnitude={results ? results[6].mainEntity.avgMagnitude : null}
          />
          <Flex overflowY="scroll" flexDirection="column" gap={2}>
            {results &&
              results
                .slice(0, 5)
                .map((object) => (
                  <TweetEmbed tweetId={object.tweetId} width={250} />
                ))}
          </Flex>
          {results ? <Graph sentiments={results ? results : null}/> : null}
        </Flex>
        <Flex height="md" justifyContent="space-around">
        <Person
            m={10}
            name = {results ? results[6].relatedSubjects[0].name : null}
            sentiment={results ? results[6].result[results[6].relatedSubjects[0].name].avgScore : null}
            magnitude={results ? results[6].result[results[6].relatedSubjects[0].name].avgMagnitude : null}
            salience = {results ? results[6].relatedSubjects[0].salience : null}
          />
          <Person
            m={10}
            name = {results ? results[6].relatedSubjects[1].name : null}
            sentiment={results ? results[6].result[results[6].relatedSubjects[1].name].avgScore : null}
            magnitude={results ? results[6].result[results[6].relatedSubjects[1].name].avgMagnitude : null}
            salience = {results ? results[6].relatedSubjects[1].salience : null}
          />
          <Person
            m={10}
            name = {results ? results[6].relatedSubjects[2].name : null}
            sentiment={results ? results[6].result[results[6].relatedSubjects[2].name].avgScore : null}
            magnitude={results ? results[6].result[results[6].relatedSubjects[2].name].avgMagnitude : null}
            salience = {results ? results[6].relatedSubjects[2].salience : null}
          />
          <Person
            m={10}
            name = {results ? results[6].relatedSubjects[3].name : null}
            sentiment={results ? results[6].result[results[6].relatedSubjects[3].name].avgScore : null}
            magnitude={results ? results[6].result[results[6].relatedSubjects[3].name].avgMagnitude : null}
            salience = {results ? results[6].relatedSubjects[3].salience : null}
          />
          </Flex>
      </Container>
      
    );
  } else {
    return <Heading>Loading...</Heading>;
  }
}

export async function getServerSideProps(context) {
  console.log(context.query);
  // returns { id: episode.itunes.episode, title: episode.title}

  //you can make DB queries using the data in context.query
  return {
    props: {
      person: context.query.person, //pass it to the page props
    },
  };
}
