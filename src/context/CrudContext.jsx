import { createContext, useContext, useEffect, useState } from "react";

const CrudContext = createContext();

const CrudContextProvider = ({ children }) => {
  // * STATES
  // Main product
  const [product, setProduct] = useState([]);

  // Full product For external Searchbar
  const [externalSearchedProduct, setExternalSearchedProduct] = useState([]);

  // Full product For getting all category
  const [fullProducts, setFullProducts] = useState([]);

  // Loader
  const [loader, setLoader] = useState(false);

  // SEARCHBAR
  const [searchbar, setSearchbar] = useState({
    search: "",
  });

  //
  //* Filters  with dinamic URl**
  const [filters, setFilters] = useState(() => {
    // Getting params for saving filter between pages
    const params = new URLSearchParams(window.location.search);

    // returning params
    return {
      search: params.get("search") || "",

      category: params.get("category") || "all",
      available: params.get("available") === "true",
      featured: params.get("featured") === "true",
      sort: params.get("sort") || "default",
      price: params.get("price") || 0,
    };
  });

  //

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

  //
  // Main Product + filtering
  useEffect(() => {
    const functionFilters = async () => {
      const queryParams = new URLSearchParams();
      // By Category
      if (filters.category !== "all") {
        queryParams.append("category", filters.category);
      }

      // TODO: internal searchbar
      if (filters.search !== "") {
        queryParams.append("search", filters.search);
      }

      // Price
      if (filters.price !== 0) {
        queryParams.append("price", filters.price);
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

      // SETTING IP DINAMICO
      // avoiding useless ? on refresh
      const newUrl = queryParams.toString()
        ? `?${queryParams.toString()}`
        : window.location.pathname;

      window.history.pushState({}, "", newUrl);

      // FETCHING RESULT BASED ON QUERY
      const gettingFilters = await fetch(
        `http://localhost:3000/products?${queryParams.toString()}`,
      );

      //
      // Array completo per Prendere tutte le categorie
      const gettingFullArray = await fetch(`http://localhost:3000/products`);

      // Getting data
      const resultFull = await gettingFullArray.json();
      const resultFiltered = await gettingFilters.json();

      // Error Handling
      if (!resultFiltered || !resultFull) {
        console.error("Array inesistente");
        return;
      } else if (
        // If not array send error
        Array.isArray(resultFiltered?.results) === false ||
        Array.isArray(resultFull?.results) === false
      ) {
        console.error(resultFiltered, "Formato Array non valido");
        return;
      }
      console.log(queryParams.toString());

      // setting states with data
      setFullProducts(resultFull?.results);
      setProduct(resultFiltered?.results);
    };

    // autodeclaring function on filters change
    functionFilters();
  }, [filters]);

  //
  //
  //
  // *** SEARCHBAR EXTERNAL
  useEffect(() => {
    // RESETTING LOADER
    if (searchbar.search === "") {
      setExternalSearchedProduct([]);
      setLoader(false);
      return;
    }

    // SETTING LOADER FOR EMPTY STATE
    setLoader(true);

    // ************ DEBOUNCED SEARCH
    const timer = setTimeout(async () => {
      try {
        // CREATING PARAMS
        const queryParams = new URLSearchParams();

        // sending searchbar value on backend
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

        // setting data
        setExternalSearchedProduct(resultSearched?.results);
      } finally {
        // Loader for spinner
        setLoader(false);
      }
    }, 300);

    // clearing Timeout
    return () => clearTimeout(timer);
  }, [searchbar]);

  //
  //   **Detailed Products
  const detailedProduct = async (id) => {
    const array = await asyncHandler(`http://localhost:3000/products/${id}`); // Setting data To Use in Detailed Page
    return array;
  };

  //   ***exports
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
    loader,
    setLoader,
  };
  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
};

const useCrudContext = () => {
  return useContext(CrudContext);
};

export { CrudContextProvider, useCrudContext };
