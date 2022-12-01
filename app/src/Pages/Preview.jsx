import React from "react";
import { Box, Flex, Image, Text, Grid, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBed, FaBath, FaTextWidth } from "react-icons/fa";

const Preview = () => {
  const [data, setData] = useState();

  const location = useLocation();

  useEffect(() => {
    setData(location.state);
  }, []);

  console.log(location.state);
  return (
    <Box py="5">
      <Flex
        bg="gray.50"
        rounded="5"
        overflow="hidden"
        direction={["column", "column", "row"]}
      >
        <Box w="100%">
          <Image src={data?.image} alt="photo" w="75rem" />
        </Box>

        <Box w="100%">
          <Text fontSize="3xl" fontWeight="bold" pb="5">
            {data?.name}
          </Text>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
            ]}
            textAlign="start"
            alignItems="center"
            fontSize="xl"
            px="2"
            gap="2"
          >
            <Flex {...TextBorder}>
              <FaBed />
              <Text>{data?.details[0]} </Text>
            </Flex>
            <Flex {...TextBorder}>
              <FaBath />
              <Text>{data?.details[1]} </Text>
            </Flex>
            <Flex {...TextBorder}>
              <FaTextWidth />
              <Text>{data?.details[2]} </Text>
            </Flex>
            <Text {...TextBorder}>{data?.address}</Text>
            <Text {...TextBorder}>
              Property type:-{" "}
              {data?.type?.charAt(0).toUpperCase() + data?.type?.slice(1)}
            </Text>
            <Text {...TextBorder}>
              Country:-{" "}
              {data?.country?.charAt(0).toUpperCase() + data?.country?.slice(1)}
            </Text>
            <Text {...TextBorder}>
              post date:- {data?.createdAt?.split("T")[0].split("-")[2]}/
              {data?.createdAt?.split("T")[0].split("-")[1]}/
              {data?.createdAt?.split("T")[0].split("-")[0]}
            </Text>
            <Text {...TextBorder}>postcode:- {data?.postalZip}</Text>
          </Grid>
          <Flex w="100%" gap="2" py="9" px="2">
            <Button
              as={"a"}
              w="100%"
              colorScheme="purple"
              variant="outline"
              py="6"
              href="tel:+4733378901"
            >
              Contact
            </Button>
            <Button
              w="100%"
              py="6"
              colorScheme="purple"
              as={"a"}
              href="tel:+4733378901"
            >
              Schedule Visit{" "}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Preview;

const TextBorder = {

  p: "5",
  gap: "2",
  alignItems: "center",
  bg: "#fff",
  rounded:'5'
};
