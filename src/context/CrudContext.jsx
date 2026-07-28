import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CrudContext = createContext();

const CrudContextProvider = ({ children }) => {
  // states
  const [product, setProduct] = useState([]);
  const [externalSearchedProduct, setExternalSearchedProduct] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // searchPARAMS

  const [fullProducts, setFullProducts] = useState([]);

  // Filters  with dinamic URl**
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      category: params.get("category") || "all",
      available: params.get("available") === "true",
      featured: params.get("featured") === "true",
      sort: params.get("sort") || "default",
    };
  });

  //
  // SEARCHBAR
  const [searchbar, setSearchbar] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get("search") || "all",
    };
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

  const urlSetter = (param, key) => {
    const url = new URLSearchParams(searchParams);
  };

  //
  // Main Product + filtering
  useEffect(() => {
    const functionFilters = async () => {
      const queryParams = new URLSearchParams();
      // By Category
      if (filters.category !== "all") {
        queryParams.append("category", filters.category);
      }
      // Searchbar
      // if (filters.search !== "all") {
      //   queryParams.append("search", filters.search);
      // }
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

      // SETTING IP DINAMICO
      window.history.pushState({}, "", `?${queryParams.toString()}`);

      // FETCHING RESULT BASED ON QUERY
      const gettingFilters = await fetch(
        `http://localhost:3000/products?${queryParams.toString()}`,
      );

      //
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
        console.error(resultFiltered, "Formato Array non valido");
        return;
      }

      //
      setFullProducts(resultFull?.results);
      setProduct(resultFiltered?.results);

      // setProduct(resultFiltered)
      console.log(`http://localhost:3000/products?${queryParams.toString()}`);
      console.log(queryParams.toString());
    };
    functionFilters();
  }, [filters]);

  //
  //
  //
  // *** SEARCHBAR EXTERNAL
  useEffect(() => {
    const functionFilters = async () => {
      console.log("test");

      const queryParams = new URLSearchParams();
      // By Category

      // Searchbar
      if (searchbar.search !== "") {
        queryParams.append("search", searchbar.search);
      }

      const gettingSearch = await fetch(
        `http://localhost:3000/product?${queryParams.toString()}`,
      );

      //
      const resultSearched = await gettingSearch.json();

      // Error Handling
      if (!resultSearched) {
        console.error("Array inesistente");
        return;
      } else if (Array.isArray(resultSearched?.results) === false) {
        console.error(resultSearched, "Formato Array non valido");
        return;
      }

      setExternalSearchedProduct(resultSearched?.results);
    };
    functionFilters();
  }, [searchbar]);

  //
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
    searchbar,
    setSearchbar,
    setFilters,
    setExternalSearchedProduct,
    externalSearchedProduct,
  };
  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};

const useCrudContext = () => {
  return useContext(CrudContext);
};

export { CrudContextProvider, useCrudContext };
