import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  // states
  const [bestSeller, setBestSeller] = useState([]);

  //   asynchandler
  const asyncHandler = async (url) => {
    try {
      const obj = await fetch(url);
      const response = await obj.json();

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  // Bestsellers
  const bestSellers = async () => {
    const array = await asyncHandler(
      `http://localhost:3000/product/bestSeller`,
    );
    return array;
  };

  useEffect(() => {
    const recivingBestSellers = async () => {
      const array = await bestSellers();

      setBestSeller(array.results);
    };
    recivingBestSellers();
  }, []);

  //   exports
  const value = { bestSeller, setBestSeller };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMainContext = () => {
  return useContext(MainContext);
};

export { MainContextProvider, useMainContext };
