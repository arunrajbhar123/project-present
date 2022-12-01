import { createContext, useState } from "react";

export const HouseContext = createContext();
export const HouseContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [clickDisable, setClickDisable] = useState(true);
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") || false);

  return (
    <HouseContext.Provider
      value={{
        isAuth,
        setIsAuth,
        clickDisable,
        setClickDisable,
        setPage,
        page,
        data,
        setData,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};
