import { createContext, useContext, useEffect, useState } from "react";

const CrudContext = createContext();

const CrudContextProvider = ({ children }) => {
  // states
  const [product, setProduct] = useState([]);

  //   asynchandler For easier Fetch
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

  // Main Products
  const mainProducts = async () => {
    const array = await asyncHandler(`http://localhost:3000/products`); // Getting Data (Promise)
    return array;
  };

  useEffect(() => {
    const recivingMainProducts = async () => {
      const array = await mainProducts(); // Translating Promise
      // Error Handling
      if (!array) {
        console.error("Array inesistente");
        return;
      } else if (Array.isArray(array.results) === false) {
        console.error("Formato Array non valido");
        return;
      }

      // SEtting Data
      const result = array.results;
      const sortedResult = result.sort((a, b) => b.is_featured - a.is_featured); //Sorting Data

      setProduct(array.results); // setting Data
    };
    recivingMainProducts();
  }, []);

  //   Detailed Products
  const detailedProduct = async (id) => {
    const array = await asyncHandler(`http://localhost:3000/products/${id}`); // Setting data To Use in Detailed Page
    return array;
  };

  //   exports
  const value = { setProduct, product, detailedProduct };
  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};

const useCrudContext = () => {
  return useContext(CrudContext);
};

export { CrudContextProvider, useCrudContext };
