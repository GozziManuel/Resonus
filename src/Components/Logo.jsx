import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <NavLink
      className=" border-0 togglerfull mb-0 navlink"
      style={{ width: "100px", cursor: "pointer" }}
      to={"/"}
    >
      <div
        className="d-flex  icon-wrapper-full"
        style={{ marginRight: "3rem" }}
      >
        <div className=" justify-content-center icon-container-full">
          <div className="d-flex align-items-center">
            <div style={{ width: "30px" }}>
              <img src="/Finale2.png" alt="" style={{ width: "100%" }} />
            </div>
            <p
              className="mb-0 ms-1 fw-bold Outfit"
              style={{
                fontSize: "1.25rem",
                color: "var(--font-color-main)",
              }}
            >
              RESONUS
            </p>
          </div>
        </div>
      </div>
    </NavLink>
  );
}
