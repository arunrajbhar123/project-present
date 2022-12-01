import { Box, Grid, Text, Image, Flex } from "@chakra-ui/react";
import { HiOutlineHeart } from "react-icons/hi";
import { FaBed, FaBath, FaTextWidth } from "react-icons/fa";
import { SearchBox } from "./SearchBox";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowBox = ({ data, status }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const HandleFavorite = (data_id) => {
    axios
      .post("http://localhost:8080/getdata/favorite", data_id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (data?.length === 0) {
    return (
      <Box>
        <SearchBox />
        No Data !
      </Box>
    );
  }
  return (
    <Box>
      {location?.pathname === "/" && <SearchBox />}
      <Grid
        templateColumns={[
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(2, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap="12"
      >
        {data?.map((el, index) => (
          <Box
            key={index}
            bg="#fff"
            position="relative"
            rounded="5"
            cursor="pointer"
            _hover={{
              boxShadow: "xl",
              rounded: "md",
            }}
            onClick={() => navigate("/preview", { state: el })}
          >
            <Image
              w="25rem"
              h="15rem"
              src={el.image}
              alt={el.type}
              borderTopLeftRadius="5"
              borderTopRightRadius="5"
            />
            <ToolKitComponents />

            <Box py="8" px="4" textAlign="start">
              <Flex justifyContent="space-between">
                <Flex alignItems="center">
                  <Text color="purple.600" fontWeight="bold" fontSize="2xl">
                    {el.currency}
                  </Text>
                  <Text mt="1">/month</Text>
                </Flex>
                <Box>
                  <Box fontSize="2xl">
                    <HiOutlineHeart
                      style={{
                        border: "1px solid #805AD5",
                        borderRadius: "25px",
                        fontSize: "25px",
                        padding: "2",
                        color: el.favorite || status ? "red" : "",
                        fill: el.favorite || status ? "red" : "",
                      }}
                      onClick={(e) => {
                        e.target.style.fill = "red";
                        e.target.style.outline = "red";
                        e.target.style.stroke = "red";
                        HandleFavorite({
                          data_id: el?._id,
                          status: !el?.favorite,
                        });
                      }}
                    />
                  </Box>
                </Box>
              </Flex>
              <Text fontSize="3xl" fontWeight="bold">
                {el.name}
              </Text>
              <Text>{el.address}</Text>
              <Text>
                Property type:{" "}
                {el.type?.charAt(0).toUpperCase() + el.type?.slice(1)}
              </Text>
              <Text>
                location:{" "}
                {el.country?.charAt(0).toUpperCase() + el.country?.slice(1)}
              </Text>
              <Text>
                post date: {el.createdAt?.split("T")[0].split("-")[2]}/
                {el.createdAt?.split("T")[0].split("-")[1]}/
                {el.createdAt?.split("T")[0].split("-")[0]}
              </Text>
              <hr style={{ margin: "8px 0px" }} />

              <Flex
                alignItems="center"
                justifyContent="space-between"
                fontSize="sm"
              >
                {el?.details?.map((items, indexs) => (
                  <Flex alignItems="center" gap="2" key={indexs}>
                    {indexs === 0 && <FaBed />}
                    {indexs === 1 && <FaBath />}
                    {indexs === 2 && <FaTextWidth />}
                    <Text>{items}</Text>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};
export default ShowBox;

const ToolKitComponents = ({ text }) => {
  return (
    <Box {...ToolKitsStyle} _before={{ ...AfterEffect }}>
      Popular
    </Box>
  );
};

const ToolKitsStyle = {
  position: "absolute",
  bg: "purple.500",
  px: 2,
  color: "#fff",
  left: -2,
  mt: -3,
  rounded: 5,
  borderBottomLeftRadius: 0,
  pl: 3,
};

const AfterEffect = {
  content: '""',
  position: "absolute",
  bg: "purple.800",
  rounded: 3.5,
  w: "25px",
  h: "15px",
  left: 0.6,
  top: 4,
  zIndex: -112,
  transform: "rotate(30deg)",
};
