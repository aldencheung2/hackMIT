import { Flex, Image, Text } from "@chakra-ui/react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ksi from "./ksi.jpeg";

const Person = (props) => {
  const sampleImage = "https://bit.ly/dan-abramov";
  // https://stackoverflow.com/questions/6394304/algorithm-how-do-i-fade-from-red-to-green-via-yellow-using-rgb-values
  // let num = 0.5+(0.4)/2;
  // let red = Math.min((2 * 255* (num)), 255);
  // let green = Math.min(2 * 255 * (1 - num), 255);
  // console.log(num);
  // let red = 256*num;
  // let green = 256*(1-num);
  // console.log(red);
  // console.log(green);
  let hue = 120 * (0.5+props.sentiment/2);
  // 4 to 16
  let barWidth = 6 + Math.min(10, props.magnitude*8);
  // barWidth = 8;
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
          display= 'block'
          marginLeft= 'auto'
          marginRight= 'auto'
        />
        <Text fontWeight="bold" textAlign="center" marginTop={25}>
          Name
        </Text>
        <Text textAlign="center" marginBottom = "25">Sentiment Score:</Text>
        <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar value={Math.round(props.sentiment * 100) / 100} strokeWidth = {barWidth} maxValue={1} minValue={-1} text={`${Math.round(props.sentiment * 100)}%`} styles={{
    path: {
      // Path color
      stroke: `hsl(${hue}, 100%, 50%)`,
      // stroke: `rgb(${red}, ${green}, 0)`,
      strokeLinecap: 'round',
      transition: 'stroke-dashoffset 0.5s ease 0s',
    }}}/>
        </div>
        <Text textAlign="center" marginTop = "25">Magnitude Score: {Math.round(props.magnitude * 100) / 100}</Text>
      </div>
    </Flex>
  );
};

export default Person;
