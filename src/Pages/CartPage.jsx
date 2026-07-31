import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import "../assets/css/cartPage.css";

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
                <div
                  key={c.id}
                  className="border-top py-4 d-flex  align-items-center row cardCart"
                >
                  <div
                    className="d-flex align-items-center  col-md-6  col-12 row col-lg-3  UpperInfo DoubleContainer "
                    style={{ marginRight: "12px;" }}
                  >
                    <div className="col-12 col-md-4 col-lg-6">
                      <button
                        className="h-50 RemoveButton"
                        style={{ padding: "6px 12px" }}
                      >
                        <i className="bi bi-cart-x-fill fs-4  "></i>
                      </button>
                    </div>
                    <div className="col-12 col-md-8 col-lg-6 ImageContainerCart">
                      <img src={c.image_url} alt="" className="ImageCart" />
                    </div>{" "}
                  </div>
                  <div className="col-md-6  col-12 col-lg-3 UpperInfo">
                    <Link
                      className="fs-5 mb-0 text-decoration-none productName "
                      style={{ color: "var(--font-color-main)" }}
                      to={`/products/${c.slug}`}
                    >
                      {c.name}
                    </Link>
                  </div>
                  <h5 className="mb-0 col-md-6 col-12 col-lg-3">
                    &euro; {c.price}
                  </h5>

                  <div className="col-md-6  col-12 col-lg-3 ">
                    <input
                      type="number"
                      min={1}
                      placeholder="Quantity"
                      style={{ width: "140px" }}
                    />
                  </div>
                </div>
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
                    <p className="mb-0 ">&euro; {c.price}</p>
                  </div>
                );
              })}
              <div className="mt-3 mx-4 py-4 border-top">
                <h5 className="  ">
                  Totale: &euro;{" "}
                  {Cart.reduce(
                    (accumulator, currentValue) =>
                      accumulator + parseFloat(currentValue.price),
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
