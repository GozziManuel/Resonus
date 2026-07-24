import { Link } from "react-router-dom";
import "../assets/css/product.css";

export default function Product({
  title,
  price,
  slug,
  featured,
  specs,
  image,
  stock,
  category,
  BestsellerSlug,
}) {
  return (
    <div className="col-md-4 col-sm-6">
      <div className="card card-dark card-bestseller h-100 p-3 position-relative">
        {featured === 1 && (
          <span className="position-absolute top-0 end-0 m-3 badgeCardCategory floating px-3 py-2  ">
            In Evidenza!
          </span>
        )}
        {BestsellerSlug.map((b) => {
          if (b === slug) {
            return (
              <span
                className="position-absolute m-3 end-0 badgeCardBestSeller floating px-3 py-2  "
                style={{ bottom: "31%" }}
              >
                BestSeller
              </span>
            );
          }
        })}
        <div className="" style={{ height: "320px" }}>
          <img
            src={image}
            className="card-img-top rounded-3 "
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            alt="Aether Soundscape Pro"
          />
        </div>
        <div className="card-body p-0 d-flex flex-column justify-content-between mt-3">
          <div>
            <small className="text-secondary text-uppercase fw-bold">
              {category}
            </small>
            <h5 className="card-title  fw-bold mt-1"> {title}</h5>
            {stock < 20 ? (
              <p className="card-text text-warning small">Quasi Esaurito!</p>
            ) : stock === 0 ? (
              <p className="card-text text-danger fw-bold small">Esaurito</p>
            ) : (
              <p className="card-text text-secondary small">Disponibile</p>
            )}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
            <span className="fs-4 fw-bold mb-3">&euro; {price}</span>
            <Link
              className="buttonBasic "
              to={`/products/${slug}`}
              style={{ textDecoration: "none" }}
            >
              Vedi Prodotto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
