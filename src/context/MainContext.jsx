import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useCrudContext } from "./CrudContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  // Getting products
  const { setProduct, product } = useCrudContext();

  // states
  const [bestSeller, setBestSeller] = useState([]);

  // **** TOAST
  const [showToast, setShowToast] = useState(false);
  const [addedOrRemoved, setAddedOrRemoved] = useState({
    added: null,
    removed: null,
  });

  // ToastTrigger
  const timerRef = useRef(null);
  //
  const triggerToast = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setShowToast(true);
    timerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

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
      triggerToast();
      // SEndind obj to backend Cart
      const PostData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      };

      // Adding obj to Cart
      const response = await fetch(`${API_BASE_URL}/cart/addToCart`, PostData);

      // result
      const data = await response.json();

      // attiva trigger
      setTrigger((curr) => curr + 1);
      setAddedOrRemoved({
        added: true,
        removed: false,
      });

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
        const response = await fetch(`${API_BASE_URL}/cart/cartitems`);
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

  // ****** DELETE FROM CART
  const removeToCart = async (slug) => {
    try {
      triggerToast();
      const CurrentObj = Cart.find((c) => c.slug === slug);
      const PostData = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const array = await fetch(
        `${API_BASE_URL}/cart/removeToCart/${slug}`,
        PostData,
      ); // Setting data To Use in Detailed Page
      const data = await array.json();
      setAddedOrRemoved({
        added: false,
        removed: true,
      });
      console.log(data);

      // Setting Filtered ARRAY
      setCart(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  //   exports
  const value = {
    bestSeller,
    setBestSeller,
    BestsellerSlug,
    // Cart
    addToCart,
    Cart,
    CartLoader,
    removeToCart,
    setCart,
    showToast,
    setShowToast,
    addedOrRemoved,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMainContext = () => {
  return useContext(MainContext);
};

export { MainContextProvider, useMainContext };
