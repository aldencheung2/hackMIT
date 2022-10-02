import { Flex, Image, Text } from "@chakra-ui/react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ksi from "./ksi.jpeg";

const Person = (props) => {
  const sampleImage = "https://bit.ly/dan-abramov";
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      style={{
        border: "1px solid lightgrey",
        borderRadius: "10px",
        width: "20%",
        textAlign: "center",
      }}
      {...props}
    >
      <div style={{ padding: "25px" }}>
        <Image
          src={sampleImage}
          rounded="full"
          objectFit="cover"
          boxSize={40}
        />
        <Text fontWeight="bold" textAlign="center" marginTop={25}>
          Name
        </Text>
        <Text>Sentiment Score: {props.sentiment}</Text>
        <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value={props.sentiment} maxValue={1} text={`${props.sentiment * 100}%`} />;
        </div>
      </div>
    </Flex>
  );
};

export default Person;
