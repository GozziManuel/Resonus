import { useMainContext } from "../context/MainContext";
import { Link, useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const { orders, addToCart, Cart } = useMainContext();
  const newDate = `${new Date().getDate()} / ${new Date().getMonth()} / ${new Date().getFullYear()}`;
  console.log(newDate);

  //
  console.log(orders);
  const navigate = useNavigate();
  return (
    <section className="mb-5">
      <h1 className="Outfit mt-3 pb-2">I tuoi acquisti</h1>
      <hr />
      <div>
        <div className="row g-4 Sans  mt-2 ">
          {orders.map((el) => {
            return (
              <>
                <div className="col-md-4 col-sm-6 col-lg-3 ">
                  <div className="card card-dark card-bestseller p-3 px-4">
                    <div
                      className=" fw-bold d-flex  align-items-center gap-2"
                      style={{
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5>{el.name}</h5>
                      <span className="fs-4 fw-bold">&euro; {el.price}</span>
                    </div>
                    <div className=" mb-3">
                      <small>
                        Comprato <span className="fw-bold">{el.quantity}</span>{" "}
                        volte
                      </small>
                    </div>
                    <div className="rounded-3 " style={{ height: "200px" }}>
                      <img
                        src={el.image_url}
                        className="card-img-top rounded-3 "
                        style={{
                          objectFit: "scale-down",
                          height: "100%",
                        }}
                        alt={el.name}
                      />
                    </div>

                    {/* INfo Card */}
                    <div className="card-body p-0 d-flex flex-column justify-content-between row">
                      {/* Other infos */}
                      <div className="col-lg-12 col-md-12 mt-3">
                        <Link
                          className="buttonBasic "
                          to={`/products/${el.slug}`}
                          style={{ textDecoration: "none" }}
                        >
                          Vedi Prodotto
                        </Link>
                      </div>
                      <div className="col-lg-12 col-md-12 mt-2">
                        {Cart.some((c) => c.name === el.name) ? (
                          <Link
                            className="CartButton "
                            to={`/carrello`}
                            style={{ textDecoration: "none" }}
                          >
                            Già nel Carrello
                          </Link>
                        ) : (
                          <button
                            className="CartButton w-100"
                            onClick={() => {
                              const newObj = { ...el, quantity: 1 };
                              addToCart(newObj);

                              navigate("/checkout");
                            }}
                            // to={`/products/${slug}`}
                            style={{ textDecoration: "none" }}
                          >
                            Compra di nuovo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
}
