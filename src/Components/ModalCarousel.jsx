import { createPortal } from "react-dom";
import "../assets/css/modal.css";

export default function ModalCarousel({ isOpen, Image, name, Closer }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="ExternalModalWrapper" onClick={Closer}>
      <div className="ImageWrapperModal">
        <div className="position-relative">
          <img
            src={Image}
            alt={name}
            className="ModalImage"
            onClick={(e) => e.stopPropagation()}
          />
          <i class="bi bi-x-lg fs-3 CloseButtonModal position-absolute px-2"></i>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root"),
  );
}
