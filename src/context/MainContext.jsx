import { createContext, useContext, useEffect, useState } from "react";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  // states
  const [bestSeller, setBestSeller] = useState([]);

  //   asynchandler
  const asyncHandler = async (url) => {
    // Error Handling
    try {
      const obj = await fetch(url);
      const response = await obj.json();

      return response;
    } catch (error) {
      console.error(error, "Errore nel raggiungere il database");
    }
  };

  // Bestsellers
  const bestSellers = async () => {
    const array = await asyncHandler(
      `http://localhost:3000/product/bestSeller`,
    ); // Getting Promise
    return array;
  };

  // Translating Promise
  useEffect(() => {
    const recivingBestSellers = async () => {
      const array = await bestSellers(); // Translating Promise
      if (!array) {
        console.error(" Array inesistente");
        return;
      } else if (Array.isArray(array.results) === false) {
        console.error("Formato Array non valido");
        return;
      }

      setBestSeller(array.results); // Setting Array
    };
    // Calling the function
    recivingBestSellers();
  }, []);

  // BestSellersSlug
  // Getting SLUGS
  const BestsellerSlug = bestSeller.map((b) => b.slug);

  //   exports
  const value = { bestSeller, setBestSeller, BestsellerSlug };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMainContext = () => {
  return useContext(MainContext);
};

export { MainContextProvider, useMainContext };
