import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Stack,
  Select,
  Button,
  Grid,
} from "@chakra-ui/react";
import {  useSearchParams } from "react-router-dom";
import axios from "axios";
import { HouseContext } from "./../ContextApi/ContextProvides";

export const SearchBox = () => {
 

  return (
    <Box py={["1rem", "2rem", "2rem"]}>
      {/* <Flex
        justifyContent="space-between"
        textAlign="start"
        gap="2"
        direction={["column", "row", "row"]}
      >
        <Box w={["100%", "auto", "auto"]}>
          <Text fontSize={["lg", "xl", "1xl"]} fontWeight="bold">
            Search properties to {typeName}
          </Text>
        </Box>
        <InputGroup w={["100%", "100%", "15rem"]}>
          <Input
            bg="#fff"
            placeholder="Search with Search Bar"
            variant="none"
          />
          <InputRightElement
            children={
              <ChevronDownIcon color="purple.500" bg="gray.100" rounded="25" />
            }
          />
        </InputGroup>
      </Flex> */}
      <FilterSearch />
    </Box>
  );
};

const FilterSearch = () => {
  const [parms, setSearchParams] = useSearchParams();
  const { data, setData, page, setPage, clickDisable, setClickDisable } =
    useContext(HouseContext);

  const [filter, setFilter] = useState({
    country: parms.get("country"),
    price: parms.get("price"),
    type: parms.get("type"),
    date: parms.get("date"),
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setClickDisable(true);
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  const handleSumbit = () => {
    const setParms = GetAllPayload();
    setSearchParams(setParms);

    setPage(1);
    FetchData(setParms, "reset");
  };

  const FetchData = (payload, reset) => {
    setClickDisable(false);
    if (clickDisable) {
      if (reset) {
        axios
          .post(`https://projectpresent.vercel.app/getdata/?page=1`, payload)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .post(`https://projectpresent.vercel.app/getdata/?page=${page}`, payload)
          .then((res) => {
            setData([...data, ...res.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    const getparms = GetAllPayload();
    FetchData(getparms);
  }, [page]);

  const GetAllPayload = () => {
    var setParms = {};
    if (filter?.price !== null && filter?.price !== "") {
      setParms.price = filter.price;
    } else {
      delete setParms.price;
    }
    if (filter?.country !== null && filter?.country !== "") {
      setParms.country = capitalize(filter.country);
    } else {
      delete setParms.location;
    }
    if (filter?.type !== null && filter?.type !== "") {
      setParms["type"] = filter.type;
    } else {
      delete setParms.type;
    }
    if (filter?.date !== null && filter?.date !== "") {
      setParms["date"] = filter.date;
    } else {
      delete setParms.date;
    }
    return setParms;
  };

  function capitalize(word) {
    const lower = word.toLowerCase();
    return word?.charAt(0)?.toUpperCase() + lower.slice(1);
  }
  return (
    <Box py="5">
      <Grid
        templateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(5, 1fr)"]}
        bg="#fff"
        p="2"
        rounded="5"
        justifyContent="space-between"
        alignItems="center"
        gap={["14"]}
      >
        <Box textAlign="start">
          <Text color="gray.400">Location</Text>
          <Input
            type="text"
            name="country"
            value={filter?.country !== null ? filter?.country : ""}
            onChange={(e) => handleOnChange(e)}
            placeholder="country"
            {...InputStyle}
          />
        </Box>

        <Box textAlign="start">
          <Text color="gray.400">When</Text>
          <InputGroup>
            <Input
              name="date"
              onChange={(e) => handleOnChange(e)}
              type="text"
              value={filter?.date !== null ? filter?.date : ""}
              placeholder="Select Move-in Date"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              {...InputStyle}
            />
          </InputGroup>
        </Box>

        <Box textAlign="start">
          <Text color="gray.400">Price</Text>
          <Stack spacing={3}>
            <Select
              name="price"
              value={filter?.price !== null ? filter?.price : ""}
              onChange={(e) => handleOnChange(e)}
              placeholder="Sort By Price"
              size="sm"
              {...InputStyle}
            >
              <option value="10-100">$10.00-$100.00</option>
              <option value="100-500">$100.00-$500.00</option>
              <option value="500-5000">$500.00-$5000.00</option>
              <option value="5000-50000">$5000.00-$50000.00</option>
            </Select>
          </Stack>
        </Box>

        <Box textAlign="start">
          <Text color="gray.400">Property Type</Text>
          <Stack spacing={3} name="type" onChange={(e) => handleOnChange(e)}>
            <Select
              placeholder="House Size"
              size="sm"
              name="type"
              value={filter?.type !== null ? filter?.type : ""}
              onChange={handleOnChange}
              {...InputStyle}
            >
              <option value="single-family">Single-Family</option>
              <option value="townhouse">Townhouse</option>
              <option value="multi-family">Multi-Family</option>
              <option value="modular home">Modular Home</option>
              <option value="bungalow">Bungalow</option>
              <option value="ranch home">Ranch Home</option>
            </Select>
          </Stack>
        </Box>

        <Box w="100%">
          <Button colorScheme="purple" w="100%" onClick={handleSumbit}>
            Search
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

const InputStyle = {
  border: "none",
  p: "0",
  variant: "none",
};
