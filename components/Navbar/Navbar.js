import {
  Flex,
  Header,
  Text,
  VStack,
  HStack,
  Box,
  IconButton,
  useColorModeValue,
  useDisclosure,
  Logo,
  VisuallyHidden,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineMenu } from "@chakra-ui/accordion";
import Link from "next/link";

const Navbar = (props) => {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <Box
      {...props}
      bg={bg}
      width="100%"
      px={{
        base: 2,
        sm: 4,
      }}
      // shadow="md"
      borderBottom="1px solid lightgrey"
    >
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <Flex>
          <Text
            as="a"
            href="/dashboard"
            title="Choc Home Page"
            display="flex"
            alignItems="center"
          >
            Voice Of The Public
          </Text>
        </Flex>

        <HStack display="flex" alignItems="center" spacing={1}>
          <HStack
            spacing={1}
            mr={1}
            color="brand.500"
            display={{
              base: "none",
              md: "inline-flex",
            }}
          >
            <Link href={"/dashboard"}>
              <Button variant="ghost">Home</Button>
            </Link>
          </HStack>
          <Button colorScheme="brand" size="sm">
            Get Started
          </Button>
          <Box
            display={{
              base: "inline-flex",
              md: "none",
            }}
          >
            {/* <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              /> */}

            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              m={2}
              bg={bg}
              spacing={3}
              rounded="sm"
              shadow="sm"
            >
              <CloseButton
                aria-label="Close menu"
                onClick={mobileNav.onClose}
              />

              <Button w="full" variant="ghost">
                Features
              </Button>
              <Button w="full" variant="ghost">
                Pricing
              </Button>
              <Button w="full" variant="ghost">
                Blog
              </Button>
              <Button w="full" variant="ghost">
                Company
              </Button>
              <Button w="full" variant="ghost">
                Sign in
              </Button>
            </VStack>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
