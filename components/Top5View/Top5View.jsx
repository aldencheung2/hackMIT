import { Flex, Text, Heading, HStack } from "@chakra-ui/react";
import Person from "../Person/Person";

const TopFiveView = (props) => {
  return (
    <Flex
      {...props}
      justifyContent="space-around"
      justifySelf="center"
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
