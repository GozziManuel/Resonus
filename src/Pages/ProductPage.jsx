import "../assets/css/product.css";
import Product from "../Cards/Product";
import { useCrudContext } from "../context/CrudContext";
import { useMainContext } from "../context/MainContext";

export default function ProductPage() {
  const { setProduct, product } = useCrudContext();
  const { BestsellerSlug } = useMainContext();
  console.log(product);

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
          <div className="text-center" style={{ width: "88%" }}>
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
          {product.map((p) => {
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
                BestsellerSlug={BestsellerSlug}
              />
            );
          })}
        </div>
      </section>
    </>
  );
}
