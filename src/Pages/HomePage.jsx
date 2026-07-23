import "../assets/css/Homepage.css";
export default function HomePage() {
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
            <div className="col-lg-7">
              {/* Hero Boom */}
              {/* Title */}
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

              {/* Buttons */}
              <div className="d-flex gap-3 Sans">
                <a href="#bestseller" className=" bestSellerButton">
                  Scopri i Best Seller →
                </a>
                <a
                  href="#prodotti"
                  className="buttonBasic text-decoration-none"
                >
                  Tutti i Prodotti
                </a>
              </div>
            </div>

            {/* IMage container */}
            <div className="col-lg-5 text-center Sans">
              <div className="position-relative d-inline-block">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  alt="Aether Soundscape Pro"
                  className="img-fluid rounded-4 shadow-lg img-replace-yellow "
                  style={{ border: "1px solid var(--button-color-hover)" }}
                />
                <div
                  className="position-absolute bottom-0 start-0 m-3 p-3 card-dark text-start floating shadow-lg"
                  style={{ minWidth: "200px" }}
                >
                  <small className="text-secondary d-block fw-bold">
                    Top di Gamma
                  </small>
                  <strong className=" d-block" style={{ color: "white" }}>
                    Aether Soundscape Pro
                  </strong>
                  <span className="fw-bold price">&euro; 299.99</span>
                </div>
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
                <i class="bi bi-lightning"></i>
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
                <i class="bi bi-shield-check"></i>
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
                <i class="bi bi-headset"></i>
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
      <section id="bestseller" className="py-5 my-4">
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
            {/* Card */}
            {/* Best Seller 1 */}
            <div className="col-md-4">
              <div className="card card-dark card-bestseller h-100 p-3 position-relative">
                <span className="position-absolute top-0 end-0 m-3 badgeCardCategory floating px-3 py-2  ">
                  placeHolder
                </span>
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  className="card-img-top rounded-3 my-3"
                  alt="Aether Soundscape Pro"
                />
                <div className="card-body p-0 d-flex flex-column justify-content-between">
                  <div>
                    <small className="text-secondary text-uppercase fw-bold">
                      Placeholder
                    </small>
                    <h5 className="card-title text-white fw-bold mt-1">
                      Placeholder
                    </h5>
                    <p className="card-text text-secondary small">
                      Placeholder
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
                    <span className="fs-4 fw-bold mb-3">
                      &euro; placeHolder
                    </span>
                    <button className="buttonBasic ">Vedi Prodotto</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    //   {/* 5. FOOTER */}
    //   <footer className="border-top border-secondary-subtle py-4 text-center text-secondary small">
    //     <div className="container">
    //       <p className="mb-0">© 2026 Aether Audio Inc. Tutti i diritti riservati.</p>
    //     </div>
    //   </footer>
    // </div>
  );
}
