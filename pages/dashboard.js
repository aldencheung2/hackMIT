import { Container, Flex } from "@chakra-ui/react";
import Navbar from "../components/Navbar/Navbar";
import SearchInput from "../components/SearchInput/SearchInput";
import TopFiveView from "../components/Top5View/Top5View";

export default function Dashboard() {
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
        <TopFiveView />
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
