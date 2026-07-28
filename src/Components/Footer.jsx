import { Link, NavLink } from "react-router-dom";

export default function Footer() {
  return (
    // Footer
    <footer className=" text-secondary py-4 border-top border-secondary border-opacity-25  ">
      <div className="">
        <div className="row g-3 align-items-center justify-content-between">
          {/* Brand & Info */}
          <div className="col-md-3 mt-0 text-center text-md-start">
            <div className="w-100 mb-0">
              <NavLink
                className=" border-0 mb-0 navlink"
                style={{ cursor: "pointer" }}
                to={"/"}
              >
                <div className="d-flex  ">
                  <div className=" justify-content-center ">
                    <div className="d-flex align-items-center">
                      <div style={{ width: "30px" }}>
                        <img
                          src="/Finale2.png"
                          alt=""
                          style={{ width: "100%" }}
                        />
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
            </div>
            <p
              className="d-block text-secondary mb-0 mt-2"
              style={{ fontSize: "13px" }}
            >
              High-Fidelity Audio Equipment
            </p>
          </div>

          {/* Vantaggi Rapidi con Icone Bootstrap */}
          <div className="col-md-6 d-flex justify-content-center gap-4 small my-2 my-md-0 flex-wrap InfoContainer">
            <a
              href="mailto:supporto@resonus.it"
              className="text-decoration-none  d-flex align-items-center gap-2 InfoLink"
            >
              <i className="bi bi-envelope "></i> supporto@resonus.it
            </a>
            <span className="d-flex align-items-center gap-2">
              <i className="bi bi-clock "></i> Lun-Ven 9:00-18:00
            </span>
            <a
              href="tel:+39021234567"
              className="text-decoration-none d-flex align-items-center gap-2 InfoLink"
            >
              <i className="bi bi-telephone "></i> +39 02 1234567
            </a>
          </div>

          {/* Social */}
          <div className="col-md-3 d-flex justify-content-center justify-content-md-end gap-3 fs-5">
            <a href="#" className=" InfoLink">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className=" InfoLink">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className=" InfoLink">
              <i className="bi bi-discord"></i>
            </a>
          </div>
        </div>

        <hr className="my-3 border-secondary border-opacity-25" />

        {/* Bottom Bar: Link Essenziali e Copyright */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center small gap-2">
          <small>
            &copy; {new Date().getFullYear()} Resonus Store. Tutti i diritti
            riservati.
          </small>
          <div className="d-flex gap-3">
            <Link
              // To do!

              to="/privacy"
              className="text-secondary text-decoration-none hover-white InfoLink"
            >
              Privacy
            </Link>
            <Link
              // To do!

              to="/shipping"
              className="text-secondary text-decoration-none hover-white InfoLink"
            >
              Spedizioni
            </Link>
            <Link
              // To do!
              to="/contact"
              className="text-secondary text-decoration-none hover-white InfoLink"
            >
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
