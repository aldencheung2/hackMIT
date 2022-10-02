import { Container, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchInput from "../components/SearchInput/SearchInput";
import TopFiveView from "../components/Top5View/Top5View";

export default function Dashboard() {
  const [results, setResults] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("api/hello");
      console.log(result);
      setResults(result);
    };

    fetchData();
  }, []);

  return (
    <Container
      maxW="container.xl"
      display="flex"
      height="100vh"
      flexDir="column"
    >
      <Navbar />

      <Flex
        flexDir="column"
        height="100%"
        alignItems="center"
        border="1px solid black"
      >
        <SearchInput />
        <TopFiveView sentiment={results ? results.data.mainEntity.avgScore : null} magnitude={results ? results.data.mainEntity.avgMagnitude : null}/>
      </Flex>
    </Container>
  );
}

/**
 * - scores (-1 to 1 which is the score of sentiment)
 * - magnitude is how emotional the text is (0 - infinity)
 * - related entities (scores of related entities with high salience)
 *
 */
