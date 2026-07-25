import { motion } from "framer-motion";
import "../assets/css/product.css";
import Product from "../Cards/Product";
import { useCrudContext } from "../context/CrudContext";
import { useMainContext } from "../context/MainContext";

export default function ProductPage() {
  const { setProduct, product } = useCrudContext();
  const { BestsellerSlug } = useMainContext();

  // framer motion
  // Varianti per il container principale
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  // for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
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
        <motion.div
          className="d-flex justify-content-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div
            className="text-center"
            style={{ width: "88%" }}
            variants={itemVariants}
          >
            <motion.p className="Sans" variants={itemVariants}>
              Solo il meglio
            </motion.p>
            <motion.h1
              className="display-1 Outfit text-center fw-bold"
              variants={itemVariants}
            >
              COLLECTION
            </motion.h1>
            <motion.h5 className="Sans" variants={itemVariants}>
              Acustica di precisione, bassi profondi.
              <br /> Il meglio dell'audio, senza compromessi.
            </motion.h5>
          </div>
        </motion.div>
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
