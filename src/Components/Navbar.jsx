import "../assets/css/navbar.css";
export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
      <div className="container-fluid p-0 ">
        <div className="d-flex w-100">
          <button
            className="navbar-toggler  border-0 ps-0"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className="d-flex me-3 icon-wrapper">
              <div className=" justify-content-center icon-container">
                <span
                  className="navbar-toggler-icon"
                  style={{ width: "21px", height: "21px" }}
                ></span>
              </div>
              <p className="m-0">NavBar</p>
            </div>
          </button>
          <form className="d-flex w-100 justify-content-center" role="search">
            <input
              className=" me-2 w-100 searchbar"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul
            className="navbar-nav me-auto mb-2 mb-lg-0 d-flex"
            style={{ gap: "15px" }}
          >
            <li className="nav-item">
              <a className="nav-link active pe-1" aria-current="page" href="#">
                Home
              </a>
            </li>
            <li className="nav-item ">
              <a className="nav-link pe-1" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle pe-1"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item pe-1">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
