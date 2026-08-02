import { useState } from "react";
import "../assets/css/checkout.css";
import { useMainContext } from "../context/MainContext";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  const { Cart, removeToCart } = useMainContext();

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    indirizzo: "",
    cap: "",
    paese: "",
    citta: "",

    // payment
    payment: "CreditCard",
    intestatario: "",
    cartNumber: "",
    scadenza: "",
    cvv: "",
  });

  // Getting Full Price
  const fullPrice = Cart.reduce(
    (accumulator, currentValue) =>
      accumulator + parseFloat(currentValue.price * currentValue.quantity),
    0,
  ).toFixed(2);

  //
  const inputTracer = (e) => {
    const { name, value, checked, type } = e.target;
    //

    setFormData((curr) => ({
      ...curr,
      [name]: value,
    }));
  };
  //
  return (
    <div className=" my-5">
      <div className="row g-5">
        {/* COLONNA SINISTRA: SEZIONI DEL FORM */}
        <div className="col-md-6 col-lg-7">
          {/* 1. Indirizzo di Spedizione */}
          <h4 className="mb-3 Outfit fw-bold">1. Indirizzo di Spedizione</h4>

          {/*  */}
          <form onSubmit={(e) => e.preventDefault()} className="Sans">
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
          </form>
        </div>

        {/* COLONNA DESTRA: RIEPILOGO ORDINE */}
        <div className="col-md-6 col-lg-5 Sans">
          <h4 className="d-flex justify-content-between align-items-center mb-3 Outfit fw-bold">
            {/*  */}
            <span>Riepilogo Ordine</span>
            <span className="badge bg-primary rounded-pill">{Cart.length}</span>
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
                    <button
                      className="h-50 RemoveButton p-1"
                      style={{ padding: "6px 12px" }}
                      onClick={() => removeToCart(c.slug)}
                    >
                      <i className="bi bi-cart-x-fill   "></i>
                    </button>
                    {/*  */}
                    <Link className="text-decoration-none">
                      <p
                        className="my-0"
                        style={{ color: "var(--font-color-main)" }}
                      >
                        {c.name}
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
            <li className="list-group-item d-flex justify-content-between">
              {/* se spedizione è gratuita CAmbia tra i button */}
              {fullPrice > 150 ? (
                <>
                  <span className="fw-bold">Spedizione</span>
                  <strong>Gratis oltre i &euro; 150 </strong>
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
                    <Link className="bestSellerButton h-25" to={"/products"}>
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
            <li className="list-group-item d-flex justify-content-between fw-bold fs-5 py-4">
              <span>Conferma Pagamento</span>
              <button className="buttonBasic">Conferma</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
