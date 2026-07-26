import { createContext, useContext, useEffect, useState } from "react";

const CrudContext = createContext();

const CrudContextProvider = ({ children }) => {
  // states
  const [product, setProduct] = useState([]);
  const [fullProducts, setFullProducts] = useState([]);

  // Filters **
  const [filters, setFilters] = useState({
    category: "",
    sort: "default",
    available: false,
    featured: false,
  });
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

  // Main Product + filtering

  useEffect(() => {
    const functionFilters = async () => {
      const queryParams = new URLSearchParams();
      // By Category
      if (filters.category !== "all") {
        queryParams.append("category", filters.category);
      }
      // Stock
      if (filters.available) {
        queryParams.append("available", "true");
      }

      // Stock
      if (filters.featured) {
        queryParams.append("featured", "true");
      }

      // SORTING

      if (filters.sort !== "default") {
        queryParams.append("sort", filters.sort);
      }

      const gettingFilters = await fetch(
        `http://localhost:3000/products?${queryParams.toString()}`,
      );
      // Array completo per Prendere tutte le categorie
      const gettingFullArray = await fetch(`http://localhost:3000/products`);

      //
      const resultFull = await gettingFullArray.json();
      const resultFiltered = await gettingFilters.json();

      // Error Handling
      if (!resultFiltered || !resultFull) {
        console.error("Array inesistente");
        return;
      } else if (
        Array.isArray(resultFiltered?.results) === false ||
        Array.isArray(resultFull?.results) === false
      ) {
        console.error("Formato Array non valido");
        return;
      }

      setFullProducts(resultFull?.results);
      setProduct(resultFiltered?.results);

      // setProduct(resultFiltered)
      console.log(queryParams.toString());
    };
    functionFilters();
    console.log(filters.sort);
  }, [filters]);

  //   Detailed Products
  const detailedProduct = async (id) => {
    const array = await asyncHandler(`http://localhost:3000/products/${id}`); // Setting data To Use in Detailed Page
    return array;
  };

  //   exports
  const value = {
    setProduct,
    product,
    detailedProduct,
    fullProducts,
    filters,
    setFilters,
  };
  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};

const useCrudContext = () => {
  return useContext(CrudContext);
};

export { CrudContextProvider, useCrudContext };
