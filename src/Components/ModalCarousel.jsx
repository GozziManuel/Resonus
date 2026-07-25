import { createPortal } from "react-dom";
import "../assets/css/modal.css";

export default function ModalCarousel({ isOpen, Image, name, Closer }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="ExternalModalWrapper" onClick={Closer}>
      <div className="ImageWrapperModal">
        <img
          src={Image}
          alt={name}
          className="ModalImage"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>,
    document.getElementById("portal-root"),
  );
}
