import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import "../assets/css/cartPage.css";
import CartCard from "../Cards/CartCard";
import PopUpContainer from "../Components/PopUpContainer";

export default function CartPage() {
  const { Cart } = useMainContext();

  return (
    <>
      <div className="Outfit">
        <div className="row">
          <div className="col-md-8 mt-4 col-12">
            <h1 className="mb-4">Il tuo Carrello</h1>
            {Cart.length === 0 && (
              <div className="border-top ">
                <h2 className="pt-4">
                  Il Carrello è vuoto <br />
                </h2>
                <Link
                  className="bestSellerButton  "
                  style={{ width: "35%" }}
                  to={"/products"}
                >
                  Aggiungi qualche prodotto
                </Link>
              </div>
            )}
            {Cart.map((c) => {
              return (
                <CartCard
                  image_url={c.image_url}
                  slug={c.slug}
                  id={c.id}
                  name={c.name}
                  price={c.price}
                  key={c.id}
                  quantity={c.quantity}
                />
              );
            })}
          </div>

          {/* Right Container For recap */}
          <div className=" col-md-4 mt-4 col-12">
            <div className="border ">
              {Cart.length === 0 && (
                <p className="d-flex gap-2 align-items-center m-4">
                  Carrello Vuoto
                </p>
              )}
              {Cart.map((c) => {
                return (
                  <div
                    className="d-flex gap-2 align-items-center m-4"
                    key={c.id}
                  >
                    <p className="mb-0 fw-bold">{c.name}:</p>
                    <p className="mb-0 ">
                      &euro; {(c.price * c.quantity).toFixed(2)}
                    </p>
                  </div>
                );
              })}
              <div className="mt-3 mx-4 py-4 border-top">
                <h5 className="  ">
                  Totale: &euro;{" "}
                  {Cart.reduce(
                    (accumulator, currentValue) =>
                      accumulator +
                      parseFloat(currentValue.price * currentValue.quantity),
                    0,
                  ).toFixed(2)}
                </h5>
                {Cart.length !== 0 && (
                  <Link
                    className="mt-3 bestSellerButton rounded border-1 p-2 d-flex justify-content-center"
                    style={{
                      background: "var(--button-third-color)",
                      color: "var(--font-color-main)",
                    }}
                    to={"/checkout"}
                  >
                    Procedi al pagamento
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <PopUpContainer />
    </>
  );
}
