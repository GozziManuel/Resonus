import { createContext, useContext, useEffect, useState } from "react";
import { useCrudContext } from "./CrudContext";

const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  // Getting products
  const { setProduct, product } = useCrudContext();

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

  // Translating Promises
  useEffect(() => {
    const recivingBestSellers = async () => {
      const arrayBestsellers = await bestSellers(); // Translating Promise bestSellers

      if (!arrayBestsellers) {
        console.error(" Array inesistente");
        return;
      } else if (Array.isArray(arrayBestsellers.results) === false) {
        console.error("Formato Array non valido");
        return;
      }

      setBestSeller(arrayBestsellers.results); // Setting Array Bestsellers
    };
    // Calling the function
    recivingBestSellers();
  }, []);

  //
  // *************** FILTERS *********

  // *************************
  //
  // BestSellersSlug
  // Getting SLUGS
  const BestsellerSlug = bestSeller.map((b) => b.slug);

  //   exports
  const value = {
    bestSeller,
    setBestSeller,
    BestsellerSlug,
    // filters
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMainContext = () => {
  return useContext(MainContext);
};

export { MainContextProvider, useMainContext };
