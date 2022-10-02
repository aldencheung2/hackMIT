import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchInput from "../components/SearchInput/SearchInput";
import TopFiveView from "../components/Top5View/Top5View";
import Person from "../components/Person/Person";

export default function individualPage(props) {
  const [results, setResults] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const body = {
        person: props.person,
      };
      const result = await axios.put("api/hello", body);
      console.log("RESULTSSSSSSS", result);
      setResults(result);
    };

    // fetchData();
  }, []);

  return (
    <Container width="100%" maxW="container.xl">
      <Navbar />
      <Heading m={10}>{props.person ? props.person : "Dummy Name"}</Heading>
     
      <Person
        m={10}
        sentiment={results ? results.data.mainEntity.avgScore : null}
        magnitude={results ? results.data.mainEntity.avgMagnitude : null}

      />
    </Container>
  );
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
