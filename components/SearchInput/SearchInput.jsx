import { Flex, Input, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

const SearchInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <Flex flexDir="column" py={4}>
      <Heading my={4}>Search Person</Heading>
      {/* <Input placeholder='Search' width="3xl" height={16}/> */}
      <div
        style={{
          width: "3xl",
          height: "16",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <input
          id="searchQueryInput"
          onChange={handleChange}
          type="text"
          name="searchQueryInput"
          placeholder="Search"
          value={inputValue}
          style={{
            width: "100%",
            height: "2.8rem",
            background: "#f5f5f5",
            outline: "none",
            border: "none",
            borderRadius: "1.625rem",
            fontSize: "1rem",
            padding: "0 3.5rem 0 1.5rem",
          }}
        />

        <Link
          href={{
            pathname: "individualPage",
            query: {
              person: inputValue,
            },
          }}
        >
          <button
            id="searchQuerySubmit"
            type="submit"
            name="searchQuerySubmit"
            style={{
              width: "3.5rem",
              height: "2.8rem",
              marginLeft: "-3.5rem",
              background: "none",
              border: "none",
              outline: "none",
            }}
          >
            <svg
              style={{ width: "24px", height: "24px", viewBox: "0 0 24 24" }}
            >
              <path
                fill="#666666"
                d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
              />
            </svg>
          </button>
        </Link>
      </div>
    </Flex>
  );
};

export default SearchInput;
