import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";

export default function GreetingsPage() {
  useEffect(() => {
    return () => {
      localStorage.removeItem("order_access");
    };
  }, []);

  // import
  const { Cart, formData } = useMainContext();

  // fullPrice
  const fullPrice = Cart.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.price * currentValue.quantity),
    0,
  ).toFixed(2);

  // current data
  const data = new Date();
  const formattedData = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  console.log(data);

  //
  return (
    <div className=" d-flex align-items-center justify-content-center bg-body-tertiary py-5 px-3 Sans">
      <div className="container" style={{ maxWidth: "650px" }}>
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="card-body p-4 p-md-5 text-center">
            {/* Icona Check Animata / Evidenziata */}
            <div className="mb-4">
              <div
                className=" text-success rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: "80px", height: "80px" }}
              >
                <i className="bi bi-check-circle-fill display-4"></i>
              </div>
            </div>

            {/* Titolo e messaggio principale */}
            <h1 className="h2 fw-bold Outfit mb-2 text-body-emphasis">
              Grazie per il tuo ordine!
            </h1>
            <p className="text-secondary mb-4">
              Abbiamo ricevuto il tuo pagamento. Ti abbiamo inviato una mail di
              conferma con tutti i dettagli.
            </p>

            {/* Box info ordine */}
            <div className="bg-light rounded-3 p-3 mb-4 text-start">
              <div className="row g-2 small text-secondary">
                {/*  */}
                <div className="col-6">
                  <span>Numero Ordine:</span>
                  <strong className="d-block text-dark fw-semibold">
                    #RES-98421
                  </strong>
                </div>

                {/*  */}
                <div className="col-6">
                  <span>Data:</span>
                  <strong className="d-block text-dark fw-semibold">
                    {formattedData}
                  </strong>
                </div>

                {/*  */}
                <div className="col-6 mt-2">
                  <span>Metodo di Pagamento:</span>
                  <strong className="d-block text-dark fw-semibold">
                    {formData.payment}
                  </strong>
                </div>

                {/*  */}
                <div className="col-6 mt-2">
                  <span>Stima Consegna:</span>
                  <strong className="d-block text-dark fw-semibold">
                    1-2 Giorni Lavorativi
                  </strong>
                </div>
              </div>
            </div>

            {/* Azioni utente */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <Link
                to="/products"
                className="buttonBasic text-decoration-none btn-lg px-4 fs-6 fw-semibold rounded-3"
              >
                Continua lo Shopping
              </Link>
              <Link
                to="/"
                className="bestSellerButton btn-lg px-4 fs-6 fw-semibold rounded-3"
              >
                Torna alla Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
