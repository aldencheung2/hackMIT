import { Container, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchInput from "../components/SearchInput/SearchInput";
import TopFiveView from "../components/Top5View/Top5View";

export default function Dashboard() {
  const [results, setResults] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const topFivePeople = [
        "Elon Musk",
        "Joe Biden",
        "Andrew Tate",
        "Mark Zuckerburg",
        "Donald Trump",
      ];

      const gatherSentiments = [];

      for (const person of topFivePeople) {
        const body = {
          person,
        };
        try {
          const result = await (await axios.put("api/hello", body)).data;
          gatherSentiments.push({ name: person, ...result });
        } catch (error) {
          console.log(error);
        }
      }

      const sentimentAverage = gatherSentiments.map((person) => {
        // console.log(person);
        return {
          name: person.name,
          avgScore: person.mainEntity.avgScore,
          avgMagnitude: person.mainEntity.avgMagnitude,
        };
      });
      // console.log("SENTIMENT AVERAGEEEE", sentimentAverage);
      setResults(sentimentAverage);
    };

    fetchData();
  }, []);

  if (results) {
    return (
      <Container
        maxW="container.xl"
        display="flex"
        height="100vh"
        w="100%"
        flexDir="column"
        // border = '1px solid black'
      >
        <Navbar />
        <Heading my={4} alignSelf="center">
          Voice Of The Public
        </Heading>
        <Flex
          flexDir="column"
          height="100%"
          alignItems="center"
          // border="1px solid black"
        >
          <SearchInput />
          <TopFiveView
            sentiment={
              results
                ? results.map((person) => {
                    // console.log("PERSONNNNNNN", person);
                    return person.avgScore;
                  })
                : null
            }
            magnitude={
              results ? results.map((person) => person.avgMagnitude) : null
            }
            name={results ? results.map((person) => person.name) : null}
          />
        </Flex>
      </Container>
    );
  } else {
    return <Heading>Loading...</Heading>;
  }
}

/**
 * - scores (-1 to 1 which is the score of sentiment)
 * - magnitude is how emotional the text is (0 - infinity)
 * - related entities (scores of related entities with high salience)
 *
 */
