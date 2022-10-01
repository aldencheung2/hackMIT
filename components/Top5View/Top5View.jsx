import { Flex, Text, Heading, HStack } from "@chakra-ui/react";
import Person from "../Person/Person";

const TopFiveView = () => {
  return (
    <Flex
      justifyContent="space-around"
      justifySelf="center"
      border="1px solid black"
      width="full"
      mt={24}
    >
      <Person />
      <Person />
      <Person />
      <Person />
    </Flex>
  );
};

export default TopFiveView;
