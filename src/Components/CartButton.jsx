import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

export default function CartButton() {
  return createPortal(
    <div>
      <Link
        className="position-fixed cartButton   d-flex justify-content-end align-items-center pe-3"
        to={"/carrello"}
      >
        <i className="bi bi-cart fs-2"></i>
      </Link>
    </div>,
    document.getElementById("portal-root"),
  );
}
