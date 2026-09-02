import { useEffect, useState } from "react";
import "../assets/css/checkout.css";
import { useMainContext } from "../context/MainContext";
import { Link, useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  let alfabeto = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZòàùèò";
  let symbols = " !\"#$%&'()*+,-./:;<=>£?@[\\\\]^_`{|}~";
  //
  const { Cart, removeToCart, setCart, formData, setFormData, orderHistory } =
    useMainContext();

  //
  const navigate = useNavigate();
  //

  // If empty turn back
  useEffect(() => {
    if (Cart.length === 0) {
      navigate("/carrello");
    }
  }, []);
  //
  const [loader, setLoader] = useState(false);

  // errorHAnDLING
  const [error, setError] = useState(null);

  const [showError, setShowError] = useState(null);

  //
  console.log(Cart);

  // Getting Full Price
  const fullPrice = Cart.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.price * currentValue.quantity),
    0,
  ).toFixed(2);

  //
  const inputTracer = (e) => {
    const { name, value, checked, type } = e.target;

    // CAP  AND CVV CONTROLLER

    // **CAP
    if (name === "cap") {
      if (value === "") {
        setFormData((curr) => ({
          ...curr,
          [name]: value,
        }));
      }

      // MAX 5 NUMBER
      if (value.length > 5) {
        return;
      }

      // last char for controlling letter and symbols
      const lastChar = value.charAt(value.length - 1);

      if (alfabeto.includes(lastChar) || symbols.includes(lastChar)) {
        return;
      }
    }

    // **CVV
    if (name === "cvv") {
      if (value === "") {
        setFormData((curr) => ({
          ...curr,
          [name]: value,
        }));
      }

      // MAX NUMBER CVV 3
      if (value.length > 3) {
        return;
      }

      // last char for controlling letter and symbols
      const lastChar = value.charAt(value.length - 1);

      if (alfabeto.includes(lastChar) || symbols.includes(lastChar)) {
        return;
      }
    }

    // CARt number
    if (name === "cartNumber") {
      if (value === "") {
        setFormData((curr) => ({
          ...curr,
          [name]: value,
        }));
      }

      // last char for controlling letter and symbols
      const lastChar = value.charAt(value.length - 1);

      if (alfabeto.includes(lastChar) || symbols.includes(lastChar)) {
        return;
      }
    }

    //
    setShowError(false);

    setFormData((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    console.log("caricamento...");

    try {
      const PostData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, price: fullPrice }),
      };

      //
      const fetching = await fetch(
        `http://localhost:3000/product/checkout`,
        PostData,
      );

      // sending email
      // const sendingEmail = await fetch(
      //   `http://localhost:3000/send-email`,
      //   PostData,
      // );
      // Order history adder
      orderHistory(Cart);
      // getting data
      const data = await fetching.json();

      // handling error
      if (data.success === false) {
        setShowError(true);
        setError(data.message);
        window.scroll({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      console.log(data);
      // RESETTING THE CART sending to backend
      const PostDataDelete = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`http://localhost:3000/product/reset`, PostDataDelete);

      //
      // Refreshing in frontend
      setCart([]);

      //
      navigate("/greetings");
      localStorage.setItem("order_access", "true");
    } catch (err) {
      console.error(err);
    } finally {
      setLoader(false);
      console.log("fatto");
    }
  };

  //
  return (
    <>
      {/* LOader for email sender */}
      {loader ? (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <div
              className="spinner-border text-dark mb-3"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Caricamento...</span>
            </div>
            <p className="text-muted fw-semibold mb-0 fs-6">
              Caricamento in corso...
            </p>
          </div>
        </div>
      ) : (
        //
        <form className=" my-5" onSubmit={(e) => handleSubmit(e)}>
          {showError && (
            <div
              className=" mb-3 w-100 py-2 px-3 d-flex justify-content-center rounded"
              style={{ background: "var(--remove-button-hover)" }}
            >
              <p className="mb-0 text-light Outfit fs-3">Errore: {error}</p>
            </div>
          )}
          <div className="row g-5">
            {/* COLONNA SINISTRA: SEZIONI DEL FORM */}
            <div className="col-md-6 col-lg-7">
              {/* 1. Indirizzo di Spedizione */}
              <h4 className="mb-3 Outfit fw-bold">
                1. Indirizzo di Spedizione
              </h4>

              {/*  */}
              <div className="Sans">
                <div className="row g-3">
                  {/* Nome */}
                  <div className="col-sm-6">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      placeholder="Mario"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.nome}
                    />
                  </div>

                  {/* Cognome */}
                  <div className="col-sm-6">
                    <label className="form-label">Cognome</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cognome"
                      placeholder="Rossi"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.cognome}
                    />
                  </div>

                  {/* Email */}
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="mario.rossi@example.com"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.email}
                    />
                  </div>

                  {/* Indirizzo */}
                  <div className="col-12">
                    <label className="form-label">Indirizzo</label>
                    <input
                      name="indirizzo"
                      type="text"
                      className="form-control"
                      placeholder="Via Roma 123"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.indirizzo}
                    />
                  </div>

                  {/* Paese */}
                  <div className="col-md-5">
                    <label className="form-label">Paese</label>
                    <select
                      className="form-select"
                      name="paese"
                      onChange={(e) => inputTracer(e)}
                      value={formData.paese}
                    >
                      <option value="">Scegli...</option>
                      <option>Italia</option>
                    </select>
                  </div>

                  {/* Città */}
                  <div className="col-md-4">
                    <label className="form-label">Città</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Milano"
                      name="citta"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.citta}
                    />
                  </div>

                  {/* CAP */}
                  <div className="col-md-3">
                    <label className="form-label">CAP</label>
                    <input
                      name="cap"
                      type="text"
                      className="form-control"
                      placeholder="20100"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.cap}
                    />
                  </div>
                </div>

                <hr className="my-4" />

                {/* 2. Metodo di Pagamento */}
                <h4 className="mb-3 Outfit fw-bold">2. Metodo di Pagamento</h4>

                {/* Payment method */}
                <div className="my-3">
                  {/* creditCard */}
                  <div className="form-check">
                    <input
                      id="credit"
                      name="payment"
                      type="radio"
                      className="form-check-input"
                      //
                      checked={formData.payment === "CreditCard"}
                      onChange={(e) => inputTracer(e)}
                      value="CreditCard"
                    />
                    <label className="form-check-label" htmlFor="credit">
                      Carta di Credito
                    </label>
                  </div>

                  {/* paypal */}
                  <div className="form-check">
                    <input
                      id="paypal"
                      name="payment"
                      type="radio"
                      className="form-check-input"
                      //
                      onChange={(e) => inputTracer(e)}
                      checked={formData.payment === "Paypal"}
                      value="Paypal"
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>

                {/* Nome  */}
                <div className="row gy-3">
                  <div className="col-md-6">
                    <label className="form-label">Intestatario Carta</label>
                    <input
                      type="text"
                      className="form-control"
                      name="intestatario"
                      placeholder="Mario Rossi"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.intestatario}
                    />
                  </div>

                  {/* CartNUmber */}
                  <div className="col-md-6">
                    <label className="form-label">Numero Carta</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="•••• •••• •••• ••••"
                      name="cartNumber"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.cartNumber}
                    />
                  </div>

                  {/* scadenza */}
                  <div className="col-md-3">
                    <label className="form-label">Scadenza</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="MM/AA"
                      name="scadenza"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.scadenza}
                    />
                  </div>

                  {/* CVV */}
                  <div className="col-md-3">
                    <label className="form-label">CVV</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="123"
                      name="cvv"
                      //
                      onChange={(e) => inputTracer(e)}
                      value={formData.cvv}
                    />
                  </div>
                </div>

                <hr className="my-4" />

                {/* CONFIRM BUTTON */}
                <button
                  className="w-100  btn-lg buttonBasic d-flex justify-content-center"
                  type="submit"
                >
                  Conferma e Paga
                </button>
              </div>
            </div>

            {/* COLONNA DESTRA: RIEPILOGO ORDINE */}
            <div className="col-md-6 col-lg-5 Sans">
              <h4 className="d-flex justify-content-between align-items-center mb-3 Outfit fw-bold">
                {/*  */}
                <span>Riepilogo Ordine</span>
                <span className="badge bg-primary rounded-pill">
                  {Cart.length}
                </span>
              </h4>

              <ul className="list-group mb-3">
                {/* Mapping all cart Product */}
                {Cart.map((c) => {
                  return (
                    <li
                      className="list-group-item d-flex justify-content-between"
                      key={c.id}
                      to={`/products/${c.slug}`}
                    >
                      {/* Remove Button */}
                      <div className="d-flex gap-2 align-items-center">
                        <Link className="text-decoration-none">
                          <p
                            className="my-0"
                            style={{ color: "var(--font-color-main)" }}
                          >
                            {c.name}
                            <span className="fw-bold"> x {c.quantity}</span>
                          </p>
                          <small className="text-secondary">
                            {c.description.split(" ").slice(0, 3).join(" ")}...
                          </small>
                        </Link>
                      </div>
                      <span className="text-secondary">&euro; {c.price}</span>
                    </li>
                  );
                })}
                <li className="list-group-item d-flex justify-content-between fw-bold fs-5">
                  <span>Totale</span>
                  <strong>&euro; {fullPrice}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between gap-4">
                  {/* se spedizione è gratuita CAmbia tra i button */}
                  {fullPrice > 150 ? (
                    <>
                      <span className="fw-bold py-3">Spedizione</span>
                      <strong className=" py-3">
                        Gratis oltre i &euro; 150{" "}
                      </strong>
                    </>
                  ) : (
                    <div className="d-flex flex-column w-100">
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold">Spedizione</span>
                        <strong>&euro; 5</strong>
                      </div>
                      {/*  */}
                      <div className="d-flex gap-3 align-items-end">
                        <p className="mb-0  ">
                          Arriva a &euro; 150 per la spedizione gratuita
                        </p>
                        <Link
                          className="bestSellerButton h-25"
                          to={"/products"}
                        >
                          Vai
                        </Link>
                      </div>
                    </div>
                  )}
                </li>

                {/* SE spedizione è gratis rifai il calcolo */}
                {fullPrice < 150 && (
                  <li className="list-group-item d-flex justify-content-between fw-bold fs-5">
                    <span>Totale + Spedizione</span>
                    <strong>
                      {" "}
                      &euro;{" "}
                      {fullPrice < 150
                        ? (parseFloat(fullPrice) + 5).toFixed(2)
                        : fullPrice}
                    </strong>
                  </li>
                )}

                {/* Confirm Button */}
              </ul>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
