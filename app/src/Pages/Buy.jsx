import ShowBox from "./../Components/ShowBox";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { HouseContext } from "./../ContextApi/ContextProvides";

const Buy = () => {
  const { data, page, setPage, setClickDisable } = useContext(HouseContext);

  useEffect(() => {
    var id;
    const onScroll = () => {
      if (
        Math.floor(window.innerHeight + document.documentElement.scrollTop) +
          3 >=
        Math.floor(document.documentElement.offsetHeight)
      ) {
        id = setTimeout(() => {
          setPage(page + 1);
          setClickDisable(true);
        }, 1000);
        return () => clearTimeout(id);
      }
    };
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page, setPage]);

  return <ShowBox data={data} />;
};
export default Buy;
