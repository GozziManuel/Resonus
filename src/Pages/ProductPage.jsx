import { motion } from "framer-motion";
import "../assets/css/product.css";
import Product from "../Cards/Product";
import { useCrudContext } from "../context/CrudContext";
import { useMainContext } from "../context/MainContext";
import { useEffect, useState } from "react";

export default function ProductPage() {
  // CRUD IMPORT
  const { setProduct, product, fullProducts, filters, setFilters, urlSetter } =
    useCrudContext();

  // selectHandler
  const handleSelect = (e) => {
    setSelect(e.target.value);

    //
    setFilters({
      ...filters,
      category: e.target.value,
    });
  };

  const handleSlider = (e) => {
    setSlider(e.target.value);
    console.log(slider);

    setFilters({
      ...filters,
      price: e.target.value,
    });
  };
  //
  // MAIN IMPORTS
  const { BestsellerSlug } = useMainContext();

  // States
  const [clicked, setClicked] = useState(false);
  const [select, setSelect] = useState(filters.category);

  const [slider, setSlider] = useState(filters.price);

  // Getting full categories
  const fullCategories = [];
  fullProducts.forEach((element) => {
    if (fullCategories.includes(element.category_name)) {
      return;
    }
    fullCategories.push(element.category_name);
  });

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
      <section
        className="py-3 px-3 rounded-4 mt-3 shadow-sm"
        style={{
          backgroundColor: "var(--inner-color, #f8f9fa)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {/* Header Toggle */}
        <div className="d-flex justify-content-center">
          <button
            style={{ background: "none", border: "none" }}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
            className="d-flex align-items-center gap-2 text-decoration-none text-dark"
          >
            <i className="bi bi-funnel "></i>
            <p className=" text-uppercase mb-0 Outfit">Filtri & Ordinamento</p>
            <i className="bi bi-chevron-down opacity-75 small"></i>
          </button>
        </div>

        {/* Contenuto Collassabile */}
        <div className="collapse mt-3" id="collapseExample">
          <div className="card card-body border-0 bg-transparent p-0">
            <div className="row g-3 align-items-center justify-content-center">
              {/* 1. In Evidenza */}
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <button
                  type="button"
                  className={`btn w-100 py-2 px-2 FilterButtonHover rounded-3 d-flex align-items-center  justify-content-center gap-2 fw-semibold  ${
                    filters.featured
                      ? "shadow-sm FilterButton"
                      : "btn-outline-secondary bg-white text-dark border-light-subtle"
                  }`}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      featured: filters.featured ? false : true,
                    })
                  }
                >
                  <span> In Evidenza</span>
                  {filters.featured && (
                    <span className="badge bg-white rounded-pill text-black extra-small">
                      Attivo
                    </span>
                  )}
                </button>
              </div>

              {/* 2. Disponibilità */}
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                <button
                  type="button"
                  className={`btn w-100  FilterButtonHover py-2 px-3 rounded-3 d-flex 
                    align-items-center justify-content-center gap-2 fw-semibold transition-all ${
                      filters.available
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                  onClick={() =>
                    setFilters({
                      ...filters,
                      available: filters.available ? false : true,
                    })
                  }
                >
                  <span>Disponibilità</span>
                  {filters.available && (
                    <span className="badge bg-white rounded-pill text-black extra-small">
                      Attivo
                    </span>
                  )}
                </button>
              </div>

              {/*  */}
              {/* 4. Price  */}
              <div className="col-12 col-sm-12 col-md-4 col-lg-3 Outfit">
                <div className="position-relative d-flex gap-2 ">
                  <input
                    className="w-100 slider"
                    type="range"
                    id="volume"
                    name="volume"
                    min="150"
                    max="600"
                    step={150}
                    value={slider}
                    onChange={(e) => handleSlider(e)}
                  />
                </div>
              </div>
              {/* 3. Select category */}
              <div className="col-12 col-sm-12 col-md-12 col-lg-3">
                <div className="position-relative d-flex gap-2">
                  <select
                    value={select}
                    onChange={(e) => handleSelect(e)}
                    className="form-select py-2 px-3 rounded-3 bg-white border-light-subtle shadow-none fw-medium text-secondary"
                    aria-label="Ordinamento prodotti"
                  >
                    <option value="all">Scegli Categoria (All)</option>
                    {fullCategories.map((el) => {
                      return (
                        <option value={el} key={el}>
                          {el}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>

            {/* Sorting Part */}
            <div className="row mt-3 g-3">
              <div className="col-12  d-flex justify-content-center">
                <p className=" text-uppercase mb-1 Outfit">Sorting</p>
              </div>

              {/* sorting PRICE*/}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="d-flex  align-items-center">
                  <button
                    type="button"
                    className={`btn w-100  FilterButtonHover py-2 px-3 rounded-3 d-flex 
                    align-items-center justify-content-center gap-2 fw-semibold transition-all ${
                      filters.sort === "priceUp" || filters.sort === "priceDown"
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        sort:
                          filters.sort === "default" ||
                          filters.sort === "acquisti"
                            ? "priceUp"
                            : filters.sort === "priceUp"
                              ? "priceDown"
                              : "default",
                      })
                    }
                  >
                    <span>Prezzo</span>

                    <div
                      className={`arrowForAnimation ${
                        filters.sort === "priceDown" ? "arrowAnimationUp" : ""
                      }`}
                    >
                      <i className="bi bi-arrow-down"></i>
                    </div>
                    {filters.sort === "" && (
                      <span className="badge bg-white rounded-pill text-black extra-small">
                        as
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* sorting  Più Acquisti*/}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="d-flex flex-column align-items-center">
                  <button
                    type="button"
                    className={`btn w-100  FilterButtonHover py-2 px-3 rounded-3 d-flex 
                    align-items-center justify-content-center gap-2 fw-semibold transition-all ${
                      filters.sort === "acquisti"
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        sort:
                          filters.sort === "acquisti" ? "default" : "acquisti",
                      })
                    }
                  >
                    <span>Prodotti Più Venduti</span>
                  </button>
                </div>
              </div>

              {/* sorting */}
              <div className="col-12 col-sm-6 col-md-4">
                <div className="d-flex  align-items-center">
                  <button
                    type="button"
                    className={`btn w-100  FilterButtonHover py-2 px-3 rounded-3 d-flex 
                    align-items-center justify-content-center gap-2 fw-semibold transition-all ${
                      filters.sort === "NameUp" || filters.sort === "NameDown"
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        sort:
                          filters.sort === "default" ||
                          filters.sort === "acquisti"
                            ? "NameUp"
                            : filters.sort === "NameUp"
                              ? "NameDown"
                              : "default",
                      })
                    }
                  >
                    <span>Nome (Alfabetico)</span>

                    {/* Arrow animation dinamic */}
                    <div
                      className={`arrowForAnimation ${
                        filters.sort === "NameDown" ? "arrowAnimationUp" : ""
                      }`}
                    >
                      <i className="bi bi-arrow-down"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>
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
      <section className="mb-5">
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
                colmd4={"col-md-4"}
                colsm6={"col-sm-6"}
              />
            );
          })}
        </div>
        {product.length === 0 && (
          <div className="d-flex justify-content-center Outfit ">
            <h1 className="border-top pt-3">
              Nessun risultato
              <i className="bi bi-emoji-frown-fill ms-3"></i>
            </h1>
          </div>
        )}
      </section>
    </>
  );
}
