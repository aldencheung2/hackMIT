import { Flex, Text, Heading, HStack } from "@chakra-ui/react";
import Person from "../Person/Person";

const TopFiveView = (props) => {
  console.log(props);
  return (
    <Flex
      {...props}
      justifyContent="space-around"
      justifySelf="center"
      width="full"
      mt={24}
    >
      <Person sentiment={props.sentiment} />
      <Person sentiment={props.sentiment} />
      <Person sentiment={props.sentiment} />
      <Person sentiment={props.sentiment} />
    </Flex>
  );
};

export default TopFiveView;
