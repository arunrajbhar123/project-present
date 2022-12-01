import { Flex, Text, Box, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <Flex h="90vh" alignItems="center" placeContent="center">
      <Box>
        <Text>404 | NOT FOUND</Text>
        <Button colorScheme="purple">
          <Link to={"/"}>Go To Home</Link>
        </Button>
      </Box>
    </Flex>
  );
};
export default NotFoundPage;
