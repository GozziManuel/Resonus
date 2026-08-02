import { Toast } from "bootstrap";
import { createPortal } from "react-dom";

export default function PopUpContainer({ addOrRem, show, setShow }) {
  if (!show) {
    return null;
  }
  // Animation Bootstrap for toast

  const bgColor = addOrRem?.refreshed
    ? "rgb(68, 110, 248)"
    : addOrRem?.added
      ? "rgb(115, 192, 115)"
      : "rgb(220, 53, 69)";

  //
  return createPortal(
    <div className="ExternalPopUpWrapper" id="liveToast">
      <div
        className="PopUpWrapper py-2 px-3"
        style={{ backgroundColor: bgColor }}
      >
        <div className="d-flex justify-content-between align-items-center gap-4 w-100">
          <p className="mb-0 text-white fw-semibold">{addOrRem?.message}</p>
          <button
            type="button"
            className="closeButton text-white"
            onClick={setShow}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal-root"),
  );
}
