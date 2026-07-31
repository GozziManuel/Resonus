import { createContext, useContext, useEffect, useState } from "react";
import { useCrudContext } from "./CrudContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  // Getting products
  const { setProduct, product } = useCrudContext();

  // states
  const [bestSeller, setBestSeller] = useState([]);

  // Cart
  const [Cart, setCart] = useState([]);

  const [CartLoader, setCartLoader] = useState(true);

  // TriggerCart
  const [trigger, setTrigger] = useState(0);

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
    const array = await asyncHandler(`${API_BASE_URL}/product/bestSeller`); // Getting Promise
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
  // *************** Add to cart *********
  const addToCart = async (obj) => {
    try {
      // SEndind obj to backend Cart
      const PostData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      };

      // Adding obj to Cart
      const response = await fetch(`${API_BASE_URL}/audio/addToCart`, PostData);

      // result
      const data = await response.json();

      // attiva trigger
      setTrigger((curr) => curr + 1);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  // **** Showing Cart
  useEffect(() => {
    const showCart = async () => {
      setCartLoader(true);
      try {
        const response = await fetch(`${API_BASE_URL}/audio/cartitems`);
        const data = await response.json();

        // setting Array cart
        setCart(data.results);
        return data;
      } catch (err) {
        console.error(err);
      } finally {
        setCartLoader(false);
      }
    };
    showCart();
  }, [trigger]);
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
    // Cart
    addToCart,
    Cart,
    CartLoader,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMainContext = () => {
  return useContext(MainContext);
};

export { MainContextProvider, useMainContext };
