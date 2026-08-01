import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import { useState } from "react";

export default function CartCard({
  image_url,
  slug,
  name,
  price,
  id,
  quantity,
}) {
  const { addToCart, Cart, removeToCart } = useMainContext();

  // Finding Current
  const FindingCurrent = Cart.find((c) => c.id === id);
  const currentQuantity = FindingCurrent ? FindingCurrent.quantity : quantity;
  // states
  const [quantityNumber, setQuantityNumber] = useState(quantity);

  // Show Sure button
  const [ShowSureButton, setShowSureButton] = useState(true);
  // number changer
  const [showChanger, setShowChanger] = useState(false);
  const [changer, setChanger] = useState(currentQuantity);

  // Incrementatore button
  const FindingAndIncrementing = (Number) => {
    // finding clicked Card

    // creating correct OBJ with quantity
    const obj = { ...FindingCurrent, quantity: Number };

    // SEtting Quantity Nubmer

    if (Number === -1) {
      if (FindingCurrent.quantity === 1) {
        return;
      }
      setQuantityNumber(FindingCurrent.quantity + obj.quantity);
    }
    if (Number === +1) {
      setQuantityNumber(FindingCurrent.quantity + obj.quantity);
    }

    // addTocart to refresh quantity DB
    addToCart(obj);
  };

  const numberChanger = (e) => {
    e.preventDefault();

    if (changer === FindingCurrent.quantity) {
      setShowChanger(false);
    }
    const ChangedNumber = changer - FindingCurrent.quantity;

    const obj = { ...FindingCurrent, quantity: ChangedNumber };

    addToCart(obj);
    setQuantityNumber(changer);
    setShowChanger(false);
  };
  return (
    <div className="border-top py-4 d-flex  align-items-center row cardCart">
      {ShowSureButton ? (
        <>
          <div
            className="d-flex align-items-center  col-md-6  col-12 row col-lg-3  UpperInfo DoubleContainer "
            style={{ marginRight: "12px" }}
          >
            <div className="col-12 col-md-4 col-lg-6">
              <button
                className="h-50 RemoveButton"
                style={{ padding: "6px 12px" }}
                onClick={() => setShowSureButton(false)}
              >
                <i className="bi bi-cart-x-fill fs-4  "></i>
              </button>
            </div>
            <div className="col-12 col-md-8 col-lg-6 ImageContainerCart">
              <img
                src={image_url}
                alt=""
                className="ImageCart"
                style={{ border: "solid 1px" }}
              />
            </div>{" "}
          </div>
          <div className="col-md-6  col-12 col-lg-3 UpperInfo">
            <Link
              className="fs-5 mb-0 text-decoration-none productName "
              style={{ color: "var(--font-color-main)" }}
              to={`/products/${slug}`}
            >
              {name}
            </Link>
          </div>
          <h5 className="mb-0 col-md-6 col-12 col-lg-3">&euro; {price}</h5>

          <div className="col-md-6  col-12 col-lg-3 d-flex align-items-center">
            <div className="d-flex flex-column">
              <button
                onClick={() => FindingAndIncrementing(+1)}
                className="incrementingButton"
                disabled={showChanger}
              >
                +
              </button>
              <button
                onClick={() => FindingAndIncrementing(-1)}
                className="incrementingButton"
                disabled={showChanger}
              >
                -
              </button>
            </div>
            <div>
              <p className="mb-0  ms-2">Quantity</p>
              {showChanger ? (
                <div className="d-flex ">
                  <form onSubmit={(e) => numberChanger(e, changer)}>
                    <input
                      type="number"
                      className="mb-1 ms-2 me-1"
                      min={1}
                      max={100}
                      required
                      style={{ width: "45px" }}
                      value={changer}
                      onChange={(e) => setChanger(e.target.value)}
                    />
                    <button className="ms-2">Confirm</button>
                  </form>
                </div>
              ) : (
                <div className="d-flex ">
                  <p className="mb-0 mx-3 fs-5">{quantityNumber}</p>
                  <button
                    onClick={() => {
                      setChanger(quantityNumber);
                      setShowChanger(true);
                    }}
                  >
                    Change
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <p>Sicuro di voler Togliere dal carrello?</p>
          <div className="d-flex gap-3">
            <button
              onClick={() => setShowSureButton(true)}
              className="buttonBasic"
            >
              Torna indietro
            </button>
            <button onClick={() => removeToCart(slug)} className="RemoveButton">
              Sì rimuovi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
