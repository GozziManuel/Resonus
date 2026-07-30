import { Link } from "react-router-dom";

export default function NotFoundPage({ Text }) {
  return (
    <>
      <div className="container text-center py-5 Outfit d-flex flex-column align-items-center justify-content-center min-vh-75">
        {/* Codice Errore Grande */}
        <h1 className="fw-bold text-secondary display-1 mb-0 opacity-25">
          404
        </h1>

        {/* Titolo Principale */}
        <h2 className="fw-semibold text-dark h3 mb-3">Pagina non trovata</h2>

        {/* Descrizione Generica */}
        <p
          className="text-muted fs-6 mb-4 px-3 "
          style={{ maxWidth: "500px", lineHeight: "1.6" }}
        >
          {Text ||
            "La pagina che stai cercando non esiste, è stata rimossa o l'indirizzo digitato non è corretto."}
        </p>

        {/* Pulsanti d'Azione */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-2">
          <Link
            to="/"
            className="rounded-2 px-4 py-2 d-flex align-items-center gap-2 buttonBasic text-decoration-none"
          >
            <i className="bi bi-house-door"></i>
            <span>Torna alla Home</span>
          </Link>

          <Link
            to="/products"
            className=" rounded-2 px-4 py-2 d-flex align-items-center gap-2 bestSellerButton"
          >
            <i className="bi bi-grid"></i>
            <span>Vai al Catalogo</span>
          </Link>
        </div>
      </div>
    </>
  );
}
