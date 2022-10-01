import { Flex, Image, Text } from "@chakra-ui/react";
import ksi from "./ksi.jpeg";

const Person = (props) => {
  const sampleImage = "https://bit.ly/dan-abramov";
  return (
    <Flex flexDir="column" alignItems="center" {...props}>
      <Image src={sampleImage} rounded="full" objectFit="cover" boxSize={40} />
      <Text>Sentiment Score: </Text>
      <Text fontWeight="bold">Name</Text>
    </Flex>
  );
};

export default Person;
