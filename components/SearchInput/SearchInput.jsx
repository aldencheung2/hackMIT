import { Flex, Input, Heading } from "@chakra-ui/react";

const SearchInput = () => {
    return (
        <Flex flexDir="column">
            <Heading>
                Search Person
            </Heading>
            <Input placeholder='Basic usage' width="6xl" height={16}/>
        </Flex>
        
    )
}

export default SearchInput;