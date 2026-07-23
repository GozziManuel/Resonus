import "../assets/css/product.css";

export default function ProductPage() {
  return (
    <>
      {/* Filters */}
      <section
        className="py-2 rounded-4 mt-2"
        style={{ backgroundColor: "var(--inner-color)" }}
      >
        <div className="container">
          <div className="row">
            {/*  */}
            <div className="col-md-4 d-flex align-items-center gap-3 justify-content-center"></div>

            {/*  */}
            <div className="col-md-4 d-flex align-items-center gap-3 justify-content-center"></div>

            {/*  */}
            <div className="col-md-4 d-flex align-items-center gap-3 justify-content-center"></div>
          </div>
        </div>
      </section>

      {/* Title */}
      <section className="" style={{ marginTop: "70px", marginBottom: "70px" }}>
        <div className="d-flex justify-content-center">
          <div className="text-center w-75">
            <p className="Sans">Solo il meglio</p>
            <h1 className="display-1 Outfit text-center fw-bold">COLLECTION</h1>
            <h5 className="Sans">
              Acustica di precisione, bassi profondi.
              <br /> Il meglio dell'audio, senza compromessi.
            </h5>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="">
        <div className="row g-4 Sans">
          <Product />
        </div>
      </section>
    </>
  );
}
