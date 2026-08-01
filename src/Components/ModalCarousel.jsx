import { createPortal } from "react-dom";
import "../assets/css/modal.css";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function ModalCarousel({ isOpen, Image, name, Closer }) {
  // toggling scrollbar and resetting states

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  //
  return createPortal(
    <motion.div
      className="ExternalModalWrapper"
      onClick={Closer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="ImageWrapperModal"
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="position-relative">
          <img
            src={Image}
            alt={name}
            className="ModalImage"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <i className="bi bi-x-lg fs-3 CloseButtonModal position-absolute px-2"></i>
      </motion.div>
    </motion.div>,
    document.getElementById("portal-root"),
  );
}
