import { Flex, Image, Text } from "@chakra-ui/react";
import ksi from "./ksi.jpeg";

const Person = () => {
  const sampleImage = "https://bit.ly/dan-abramov";
  return (
    <Flex flexDir="column" alignItems="center">
      <Image src={sampleImage} rounded="full" objectFit="cover" boxSize={40} />
      <Text>Sentiment Score: </Text>
      <Text fontWeight="bold">Name</Text>
    </Flex>
  );
};

export default Person;
