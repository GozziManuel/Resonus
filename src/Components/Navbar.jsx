import { NavLink } from "react-router-dom";
import "../assets/css/navbar.css";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
      <div className="container-fluid p-0 ">
        <div className="d-flex w-100 ">
          <button
            className="navbar-toggler togglerStart  border-0 navlink"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ width: "173px" }}
          >
            <div className="d-flex me-3 icon-wrapper">
              <div className=" justify-content-center icon-container">
                <div className="d-flex align-items-center">
                  <span className="navbar-toggler-icon"></span>
                  <p
                    className="mb-0 ms-1 fw-bold Outfit"
                    style={{ color: "var(--font-color-main)" }}
                  >
                    R
                  </p>
                </div>
              </div>
            </div>
          </button>

          {/* SEcond Display */}
          <Logo />

          {/* Form for searchbar */}
          <form
            className="d-flex w-100 justify-content-center align-items-center"
            role="search"
          >
            <input
              className="  w-100 searchbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        {/* Navigation LINKS */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center alignitemsMedia"
            style={{ gap: "15px" }}
          >
            {/*  */}
            <li className="nav-item">
              <NavLink
                className="navlink pe-1 HomepageButton"
                aria-current="page"
                to={"/"}
              >
                Homepage
              </NavLink>
            </li>
            {/* Collection */}
            <li className="nav-item">
              <NavLink
                className="navlink pe-1"
                aria-current="page"
                to={"/products"}
              >
                Collection
              </NavLink>
            </li>

            {/*  */}
            {/*  */}
            <li className="nav-item ">
              <a className="nav-link pe-1" href="#">
                Placeholder
              </a>
            </li>

            {/*  */}
            {/*  */}
            <li className="nav-item pe-1">
              <a className="nav-link disabled" aria-disabled="true">
                Placeholder
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
