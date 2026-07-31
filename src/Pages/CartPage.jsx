import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import "../assets/css/cartPage.css";
import CartCard from "../Cards/CartCard";

export default function CartPage() {
  const { Cart } = useMainContext();

  return (
    <>
      <div className="Outfit">
        <div className="row">
          <div className="col-md-8 mt-4 col-12">
            <h1 className="mb-4">Il tuo Carrello</h1>
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
          <div className=" col-md-4 mt-4 col-12">
            <div className="border ">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
