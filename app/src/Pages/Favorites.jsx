import ShowBox from "./../Components/ShowBox";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://projectpresent.vercel.app/getdata/favorite")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log("err");
      });
  }, []);

  return (
    <Box py="5">
      <ShowBox data={data} status={true} />
    </Box>
  );
};
export default Favorites;
