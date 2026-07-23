import { createContext, useContext, useEffect, useState } from "react";

const CrudContext = createContext();

const CrudContextProvider = ({ children }) => {
  // states
  const [product, setProduct] = useState([]);

  //   asynchandler
  const asyncHandler = async (url) => {
    const obj = await fetch(url);
    const response = await obj.json();
    return response;
  };

  // Main Products
  const mainProducts = async () => {
    const array = await asyncHandler(`http://localhost:3000/products`);
    return array;
  };

  useEffect(() => {
    const recivingMainProducts = async () => {
      const array = await mainProducts();
      setProduct(array.results);
    };
    recivingMainProducts();
  }, []);

  //   Detailed Products
  const detailedProduct = async (id) => {
    const array = await asyncHandler(`http://localhost:3000/products/${id}`);
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
