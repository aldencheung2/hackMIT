import { Flex, Input, Heading } from "@chakra-ui/react";

const SearchInput = () => {
    return (
        <Flex flexDir="column" py={4}>
            <Heading my={4}>
                Search Person
            </Heading>
            <Input placeholder='Basic usage' width="6xl" height={16}/>
        </Flex>
        
    )
}

export default SearchInput;