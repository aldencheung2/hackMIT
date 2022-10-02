import { Flex, Image, Text } from "@chakra-ui/react";
import ksi from "./ksi.jpeg";
// import './Person.css'

const Person = (props) => {
  const sampleImage = "https://bit.ly/dan-abramov";
  const circleStyle = {width: '50px',
    height: '50px',
    borderRadius: '25px',
    background: 'red',
    display: 'inline-block'}
  return (
    <Flex flexDir="column" alignItems="center" style={{border: '1px solid lightgrey', borderRadius: '10px', width:'20%', textAlign: 'center'}}{...props}>
      <div style={{padding: '25px'}}>
      <Image src={sampleImage} rounded="full" objectFit="cover" boxSize={40}/>
      <Text fontWeight="bold" textAlign='center' marginTop={25}>Name</Text>
      <Text>Sentiment Score: </Text>
      {/* <div style={circleStyle}/> */}
      <div class="container">
    <div class="row">
        <div class="col-md-3 col-sm-6">
            <div class="progress blue">
                <span class="progress-left">
                    <span class="progress-bar"></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value">90%</div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6">
            <div class="progress yellow">
                <span class="progress-left">
                    <span class="progress-bar"></span>
                </span>
                <span class="progress-right">
                    <span class="progress-bar"></span>
                </span>
                <div class="progress-value">75%</div>
            </div>
        </div>
    </div>
</div>
      </div>
    </Flex>
  );
};

export default Person;
