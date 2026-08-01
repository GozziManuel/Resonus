import { Link } from "react-router-dom";
import "../assets/css/Homepage.css";
import Product from "../Cards/Product";
import { useCrudContext } from "../context/CrudContext";
export default function HomePage() {
  const { product } = useCrudContext();
  console.log(product);
  const sortedArray = product.sort((a, b) => b.sales_count - a.sales_count);

  return (
    <main>
      {/* Home section */}
      <header className="hero-section text-center py-2 my-4 Sans">
        <div className="container">
          {/* Titolo Principale del Sito */}
          <h1 className="display-1 fw-bold Outfit brand-hero-title mb-3">
            RESONUS
          </h1>

          {/* Sottotitolo / Payoff */}
          <p
            className="lead text-secondary mx-auto mb-4 fs-4"
            style={{ maxWidth: "650px" }}
          >
            La tua esperienza audio definita nei minimi dettagli.
          </p>
        </div>
      </header>

      <section className="py-4 mb-5">
        <div>
          <div className="row gy-5">
            <div className="col-lg-6 justify-content-between d-flex flex-column">
              {/* Hero Boom */}
              {/* Title */}
              <div>
                <h1 className="display-3   mt-2 HomeTitle Outfit">
                  Ingegneria Acustica. <br />
                  <span className="  glowing">Suono Puro.</span>
                </h1>

                {/* Description */}
                <p className="lead my-4 Sans">
                  Scopri la selezione di cuffie, speaker e DAC progettati per
                  offrire fedeltà sonora senza compromessi, isolamento attivo e
                  design minimale.
                </p>
              </div>
              {/* Buttons */}
              <div className="d-flex gap-3 Sans">
                <a href="#bestseller" className=" bestSellerButton">
                  Scopri i Best Seller →
                </a>
                <Link
                  to={"/products"}
                  className="buttonBasic text-decoration-none"
                >
                  Tutti i Prodotti
                </Link>
              </div>
            </div>

            {/* GETTING MOST SALED PRODUCT */}
            <div className="col-lg-6 text-center Sans">
              <div className="row g-4 Sans">
                {sortedArray.slice(0, 1).map((p) => {
                  return (
                    <Product
                      key={p.slug}
                      title={p.name}
                      price={p.price}
                      slug={p.slug}
                      featured={p.is_featured}
                      specs={p.specs}
                      image={p.image_url}
                      stock={p.stock}
                      category={p.category_name}
                      slug={p.slug}
                      TopAcquisti={p.name}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VANTAGGI BRAND */}
      <section
        className="py-2 rounded-4"
        style={{ backgroundColor: "var(--inner-color)" }}
      >
        {/* vantaggio 1 */}
        <div className="container">
          <div className="row">
            <div className="col-md-4 d-flex align-items-center gap-3 justify-content-center">
              <div className="p-1 fs-1">
                <i className="bi bi-lightning"></i>
              </div>
              <div>
                <p className="mb-0 Outfit">Spedizione Express 24/48h</p>
                <small className="text-secondary Sans">
                  Gratuita per ordini superiori a €79
                </small>
              </div>
            </div>

            {/* Vantaggio 2 */}
            <div className="col-md-4 d-flex align-items-center gap-3 justify-content-center">
              <div className="p-1 fs-1">
                <i className="bi bi-shield-check"></i>
              </div>
              <div>
                <p className="mb-0 Outfit">Garanzia Ufficiale 2 Anni</p>
                <small className="text-secondary Sans">
                  Reso facile e gratuito entro 30 giorni
                </small>
              </div>
            </div>

            {/* vantaggio 3 */}
            <div className="col-md-4 d-flex align-items-center gap-3 justify-content-center">
              <div className="p-1 fs-1">
                <i className="bi bi-headset"></i>
              </div>
              <div>
                <p className="mb-0 Outfit">Supporto Tecnico Audio</p>
                <small className="text-secondary Sans">
                  Assistenza clienti qualificata
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEZIONE BEST SELLER */}
      <section id="bestseller" className="py-5 my-1">
        <div className="">
          <div className="mb-5">
            <span className="text-uppercase Sans">
              I più venduti della stagione
            </span>
            <h2 className="display-5 fw-bold mt-1 Outfit">
              Prodotti Best Seller
            </h2>
          </div>

          <div className="row g-4 Sans">
            {sortedArray.slice(0, 6).map((b) => {
              return (
                <Product
                  key={b.slug}
                  title={b.name}
                  price={b.price}
                  slug={b.slug}
                  featured={b.is_featured}
                  specs={b.specs}
                  image={b.image_url}
                  stock={b.stock}
                  category={b.category_name}
                  slug={b.slug}
                  colmd4={"col-md-4"}
                  colsm6={"col-sm-6"}
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
