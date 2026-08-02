import { Link, NavLink } from "react-router-dom";
import "../assets/css/navbar.css";
import Logo from "./Logo";
import ModalSearchbar from "./ModalSearchbar";
import { useState } from "react";

export default function NavBar() {
  // searchbar
  const [showSearchbar, setShowSearchbar] = useState(false);

  const [isNavOpen, setIsNavOpen] = useState(false);
  //
  //
  //
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
      <div className="container-fluid p-0 ">
        <div className="d-flex w-100 ">
          {/*  LOGO */}
          <Logo
            isNavOpen={isNavOpen}
            setIsNavOpen={() => setIsNavOpen((curr) => !curr)}
          />

          {/* Form for searchbar */}
          <div
            className="d-flex w-100 justify-content-center align-items-center"
            role="search"
          >
            <div
              className="  w-100 searchbar text-secondary Outfit fw-thin d-flex align-items-center"
              style={{ cursor: "text" }}
              placeholder="Search"
              aria-label="Search"
              onClick={() => setShowSearchbar(true)}
            >
              Search...
            </div>
          </div>
        </div>
        {/* Navigation LINKS */}
        <div
          className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`}
          id="navbarSupportedContent"
          style={{ display: isNavOpen ? "block" : undefined }}
        >
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-center alignitemsMedia"
            style={{ gap: "15px" }}
          >
            {/*  */}
            <li className="nav-item">
              <NavLink
                className="navlink pe-1 HomepageButton"
                aria-current="page"
                onClick={() => setIsNavOpen(false)}
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
                onClick={() => setIsNavOpen(false)}
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
      <ModalSearchbar
        Closer={() => setShowSearchbar(false)}
        isOpen={showSearchbar}
      />
    </nav>
  );
}
