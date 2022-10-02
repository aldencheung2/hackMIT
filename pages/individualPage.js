import { Container, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import SearchInput from "../components/SearchInput/SearchInput";
import TopFiveView from "../components/Top5View/Top5View";

export default function individualPage(props) {
    useEffect(() => {
      const fetchData = async () => {
        const body = {
            
        }
        const result = await axios.put("api/hello");
        console.log(result);
        setResults(result);
      };

      fetchData();
    }, []);

  return (
    <Container>
      individualPage
      <Text>{props.person}</Text>
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
