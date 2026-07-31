import { createPortal } from "react-dom";
import { NavLink } from "react-router-dom";

export default function CartButton() {
  return createPortal(
    <div>
      <NavLink
        className="position-fixed cartButton   d-flex justify-content-end align-items-center pe-3"
        to={"/carrello"}
      >
        <i className="bi bi-cart fs-2"></i>
      </NavLink>
    </div>,
    document.getElementById("portal-root"),
  );
}
