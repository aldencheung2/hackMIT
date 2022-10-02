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
      {props.sentiment && (
        <>
          <Person
            sentiment={props.sentiment[0]}
            magnitude={props.magnitude[0]}
            name={props.name[0]}
          />
          <Person
            sentiment={props.sentiment[1]}
            magnitude={props.magnitude[1]}
            name={props.name[1]}
          />
          <Person
            sentiment={props.sentiment[2]}
            magnitude={props.magnitude[2]}
            name={props.name[2]}
          />
          <Person
            sentiment={props.sentiment[3]}
            magnitude={props.magnitude[3]}
            name={props.name[3]}
          />
          <Person
            sentiment={props.sentiment[4]}
            magnitude={props.magnitude[4]}
            name={props.name[4]}
          />
        </>
      )}
    </Flex>
  );
};

export default TopFiveView;
