import { Link } from "react-router-dom";
import "../assets/css/product.css";
import { motion } from "framer-motion";

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
  colmd4,
  colsm6,
  TopAcquisti,
}) {
  // * Framer Motion
  // Varianti per ogni singola card
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };
  //
  //
  return (
    <motion.div
      variants={cardVariants}
      className={`${colmd4} ${colsm6} position-relative`}
      initial="hidden" // Framer Motion
      whileInView="visible" // Framer Motion
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="card card-dark card-bestseller h-100 p-3 ">
        {/*  */}
        {/* Badge Container */}
        {/* Badge 1 (in Evidenza) */}
        <div
          className="position-absolute top-0 start-0 w-100 p-3 d-flex  align-items-start pointer-events-none flex-column gap-2"
          style={{ zIndex: 2 }}
        >
          {/* Solo se in evidenza */}
          {featured === 1 && (
            <span className="   badgeCardCategory floating px-3 py-2  ">
              In Evidenza!
            </span>
          )}

          {/* Bestseller Badge */}
          {/* Solo se è un bestseller */}
          {BestsellerSlug.includes(slug) && (
            <span className=" badgeCardBestSeller floating px-3 py-2  ">
              BestSeller
            </span>
          )}
        </div>

        {/* Top acquisti BADGE */}
        <div
          className="position-absolute  w-100 p-3 d-flex  align-items-end pointer-events-none flex-column gap-2 "
          style={{ zIndex: 2, left: "3%", top: "-5%" }}
        >
          {TopAcquisti === title && (
            <span className="   TopSellerBadge floating px-3 py-2  ">
              N.1 in Acquisti!
            </span>
          )}
        </div>
        {/*  */}

        {/* IMage container + IMage */}
        <div className="rounded-3 " style={{ height: "320px" }}>
          <img
            src={image}
            className="card-img-top rounded-3 "
            style={{ objectFit: "scale-down", height: "100%", width: "100%" }}
            alt="Aether Soundscape Pro"
          />
        </div>

        {/* INfo Card */}
        <div className="card-body p-0 d-flex flex-column justify-content-between mt-3">
          <div>
            <small className="text-secondary text-uppercase fw-bold">
              {category}
            </small>

            {/* Stock dinamico */}
            <h5 className="card-title  fw-bold mt-1"> {title}</h5>
            {stock === 0 ? (
              <p className="card-text text-danger fw-bold small">Esaurito</p>
            ) : stock < 20 ? (
              <p className="card-text text-warning small">Quasi Esaurito!</p>
            ) : (
              <p className="card-text text-secondary small">Disponibile</p>
            )}
          </div>

          {/* Other infos */}
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
    </motion.div>
  );
}
