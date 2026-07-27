import { createPortal } from "react-dom";
import "../assets/css/modal.css";
import { useEffect, useState } from "react";
import { useCrudContext } from "../context/CrudContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ModalSearchbar({ isOpen, Closer }) {
  const {
    filters,
    setFilters,
    setExternalSearchedProduct,
    externalSearchedProduct,
  } = useCrudContext();
  console.log(externalSearchedProduct);

  // toggling scrollbar
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
      setExternalSearchedProduct([]);
    };
  }, [isOpen]);

  //
  if (!isOpen) return null;

  return createPortal(
    <motion.div
      className="ExternalWrapperModalSearchbar pt-2 Outfit"
      onClick={Closer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="wrapperModal "
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="w-100  ">
          <input
            type="text"
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            className="searchbar w-100 "
          />
        </div>
        <div className="searchedCardContainer">
          {externalSearchedProduct.map((el) => {
            return (
              <Link
                className="searchedCard d-flex  align-items-center gap-2"
                to={`/products/${el.slug}`}
                onClick={Closer}
              >
                <div className="ExternalImageContainer">
                  <img
                    src={el.image_url}
                    alt={el.name}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>{el.name}</div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </motion.div>,
    document.getElementById("portal-root"),
  );
}
