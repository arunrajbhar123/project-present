import "./App.css";
import Navbar from "./Components/Navbar";
import { SearchBox } from "./Components/SearchBox";
import { Box } from "@chakra-ui/react";

import MainRoute from "./MainRoute/MainRoute.jsx";

function App() {
  return (
    <Box className="App">
      <Navbar />
      <Box bg="RGBA(0, 0, 0, 0.01)">
        <Box w="90%" maxW="2000px" m="auto">
          <MainRoute />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
