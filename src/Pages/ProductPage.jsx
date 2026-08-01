import { AnimatePresence, motion } from "framer-motion";
import "../assets/css/product.css";
import Product from "../Cards/Product";
import { useCrudContext } from "../context/CrudContext";
import { useMainContext } from "../context/MainContext";
import { useEffect, useState } from "react";

export default function ProductPage() {
  // *** CRUD IMPORT
  const { setProduct, product, fullProducts, filters, setFilters } =
    useCrudContext();

  //  ***MAIN IMPORTS
  const { BestsellerSlug } = useMainContext();

  //  ***States
  // input category
  const [select, setSelect] = useState(filters.category);

  // input Slider Price
  const [slider, setSlider] = useState(filters.price);

  // Searchbar
  const [searchbar, setSearchbar] = useState("");

  // Filter opener
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  //
  // selectHandler
  const handleSelect = (e) => {
    // Setting Value on Input
    setSelect(e.target.value);

    // Setting Value for Ip
    setFilters({
      ...filters,
      category: e.target.value,
    });
  };
  //

  // handling price ranger
  const handleSlider = (e) => {
    //  tracing value for input
    setSlider(e.target.value);

    // setting filters IP
    setFilters({
      ...filters,
      price: e.target.value,
    });
  };

  // SearchHandler
  const handleSearch = (e) => {
    //  tracing value for input
    const trimmedValue = e.target.value.trim();
    setSearchbar(trimmedValue);

    // setting filters IP
    setFilters({
      ...filters,
      search: trimmedValue,
    });
  };

  // Handling Sorter For Buttons reset
  const sorterHandler = (name) => {
    //  * ****Price Logic
    // Entering on Price Button
    if (name === "price") {
      //
      // * Loop Logic
      if (
        // Se sono gli altri pulsanti
        filters.sort === "default" ||
        filters.sort === "acquisti" ||
        filters.sort === "NameDown" ||
        filters.sort === "NameUp"
      ) {
        // 1s loop PriceUp
        setFilters({
          ...filters,
          sort: "priceUp",
        });
      }

      // 2s loop PriceDown
      if (filters.sort === "priceUp") {
        setFilters({
          ...filters,
          sort: "priceDown",
        });
      }

      // Resetting Button repeat
      if (filters.sort === "priceDown") {
        setFilters({
          ...filters,
          sort: "default",
        });
      }
    }

    // Name Logic BUTTON

    // Entering on name Button
    if (name === "name") {
      // **Loop Logic Same for price
      //
      if (
        filters.sort === "default" ||
        filters.sort === "acquisti" ||
        filters.sort === "priceDown" ||
        filters.sort === "priceUp"
      ) {
        setFilters({
          ...filters,
          sort: "NameUp",
        });
      }
      if (filters.sort === "NameUp") {
        setFilters({
          ...filters,
          sort: "NameDown",
        });
      }
      if (filters.sort === "NameDown") {
        setFilters({
          ...filters,
          sort: "default",
        });
      }
    }
  };
  //

  // Getting full categories
  const fullCategories = [];
  fullProducts.forEach((element) => {
    if (fullCategories.includes(element.category_name)) {
      return;
    }

    //
    // Pushing UNIC category
    fullCategories.push(element.category_name);
  });

  // framer motion sample
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
      {/* Main Section */}
      <section
        className="py-3 px-3 rounded-4 mt-3 shadow-sm"
        style={{
          backgroundColor: "var(--inner-color, #f8f9fa)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        {/*  */}
        {/* Header Toggle  FILTERS*/}
        <div className="d-flex justify-content-center">
          <button
            style={{ background: "none", border: "none" }}
            type="button"
            className="d-flex align-items-center gap-2 text-decoration-none text-dark"
            aria-expanded={isFilterOpen}
            onClick={() => setIsFilterOpen((curr) => !curr)}
          >
            <i className="bi bi-funnel "></i>
            <p className=" text-uppercase mb-0 Outfit">Filtri & Ordinamento</p>
            <i className="bi bi-chevron-down opacity-75 small"></i>
          </button>
        </div>

        {/* Contenuto Collassabile */}
        <AnimatePresence initial={false}>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden" }}
              className={` mt-3 position-relative`}
              id="collapseExample"
              key="filter-collapse"
            >
              <div className="card card-body border-0 bg-transparent p-0">
                <div className="row g-3 align-items-center justify-content-center">
                  {/* ****FILTRI */}

                  {/*  */}
                  {/* 1. In Evidenza */}
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <button
                      type="button"
                      className={`btn w-100 py-2 px-2 FilterButtonHover rounded-3 d-flex align-items-center  justify-content-center gap-2 fw-semibold  
                    
                    ${
                      // Dinamic button
                      filters.featured
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                      //
                      // setting filters IP
                      onClick={() =>
                        setFilters({
                          ...filters,
                          featured: filters.featured ? false : true,
                        })
                      }
                    >
                      {/* Filter Name */}
                      <span> In Evidenza</span>

                      {/* Dinamic Badge */}
                      {filters.featured && (
                        <span className="badge bg-white rounded-pill text-black extra-small">
                          Attivo
                        </span>
                      )}
                    </button>
                  </div>

                  {/* 2. Disponibilità Filter */}
                  <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                    <button
                      type="button"
                      className={`btn w-100  FilterButtonHover py-2 px-3 rounded-3 d-flex 
                    align-items-center justify-content-center gap-2 fw-semibold transition-all
                    
                    ${
                      // Transition Button
                      filters.available
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                      //
                      // Setting filter For IP
                      onClick={() =>
                        setFilters({
                          ...filters,
                          available: filters.available ? false : true,
                        })
                      }
                    >
                      {/* Filter Name */}
                      <span>Disponibilità</span>

                      {/* Dinamic Badge */}
                      {filters.available && (
                        <span className="badge bg-white rounded-pill text-black extra-small">
                          Attivo
                        </span>
                      )}

                      {/*  */}
                    </button>
                  </div>

                  {/* 3. Select category */}
                  <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                    <div className="position-relative d-flex gap-2">
                      <select
                        // TRACING VALUE
                        value={select}
                        onChange={(e) => handleSelect(e)}
                        //
                        className="form-select py-2 px-3 rounded-3 bg-white border-light-subtle shadow-none fw-medium text-secondary"
                        aria-label="Ordinamento prodotti"
                      >
                        {/* placeholder option */}
                        <option value="all">Scegli Categoria (All)</option>

                        {/* Mapping other Option with  UNIC  category */}
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
                  {/*  */}

                  {/* 4. Price  */}
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 Outfit">
                    <div className="position-relative d-flex gap-2 ">
                      {/* Slider */}

                      <input
                        className="w-100 slider"
                        type="range"
                        id="volume"
                        name="volume"
                        min="150"
                        max="600"
                        step={150}
                        // tracing Value
                        value={slider}
                        onChange={(e) => handleSlider(e)}
                      />
                    </div>
                  </div>

                  {slider !== 0 && (
                    <button
                      className="mt-2 backToShopButton Outfit"
                      style={{ width: "150px", border: "1px solid black" }}
                      onClick={() => {
                        setSlider(0);
                        setFilters({
                          ...filters,
                          price: 0,
                        });
                      }}
                    >
                      Resetta Prezzo
                    </button>
                  )}
                </div>

                {/* ***********FILTERS SORTER********* */}
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
                    align-items-center justify-content-center gap-2 fw-semibold transition-all 
                    ${
                      // Dinamic BUtton Color on click between different sort
                      filters.sort === "priceUp" || filters.sort === "priceDown"
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                        // sending button name on Main function
                        onClick={() => sorterHandler("price")}
                      >
                        {/* Button Name */}
                        <span>Prezzo</span>

                        <div
                          className={`arrowForAnimation 
                        
                        ${
                          // Dinamic arrow
                          filters.sort === "priceDown" ? "arrowAnimationUp" : ""
                        }`}
                        >
                          <i className="bi bi-arrow-up"></i>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* sorting  Più Acquisti*/}
                  <div className="col-12 col-sm-6 col-md-4">
                    <div className="d-flex flex-column align-items-center">
                      <button
                        type="button"
                        className={`btn w-100  FilterButtonHover py-2 px-3 rounded-3 d-flex 
                    align-items-center justify-content-center gap-2 fw-semibold transition-all 
                    ${
                      // Dinamic button on click
                      filters.sort === "acquisti"
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                        // sending Ip filter
                        onClick={() =>
                          setFilters({
                            ...filters,
                            sort:
                              filters.sort === "acquisti"
                                ? "default"
                                : "acquisti",
                          })
                        }
                      >
                        {/* button Name  */}
                        <span>Prodotti Più Venduti</span>
                      </button>
                    </div>
                  </div>

                  {/* sorting NAME */}
                  <div className="col-12 col-sm-12 col-md-4">
                    <div className="d-flex  align-items-center">
                      <button
                        type="button"
                        className={`btn w-100  FilterButtonHover py-2 px-3 rounded-3 d-flex 
                    align-items-center justify-content-center gap-2 fw-semibold transition-all 
                    
                    ${
                      // dinamic Button
                      filters.sort === "NameUp" || filters.sort === "NameDown"
                        ? "shadow-sm FilterButton"
                        : "btn-outline-secondary bg-white text-dark border-light-subtle"
                    }`}
                        // sending button name for main Function
                        onClick={() => sorterHandler("name")}
                      >
                        <span>Nome (Alfabetico)</span>

                        {/* Arrow animation dinamic */}
                        <div
                          className={`arrowForAnimation ${
                            filters.sort === "NameDown"
                              ? "arrowAnimationUp"
                              : ""
                          }`}
                        >
                          <i className="bi bi-arrow-up"></i>
                          {/*  */}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* RESET BUTTON */}
                  {/* APPEAR ONLY IF THERE IS A FILTER */}
                  {filters.sort === "default" &&
                  filters.price === 0 &&
                  filters.category === "all" &&
                  filters.available === false &&
                  filters.featured === false ? (
                    ""
                  ) : (
                    <div className="col-12 d-flex justify-content-center ">
                      <button
                        type="button"
                        className="w-100 buttonBasic h-75 d-flex justify-content-center Outfit"
                        // RESETTING PARAMS
                        onClick={() => {
                          const params = new URLSearchParams(
                            window.location.search,
                          );

                          // RESETTING STATES
                          setSelect("all");
                          setSlider(0);

                          // RESETTING PARAMS
                          setFilters({
                            ...filters,
                            category: params.delete("category") || "all",
                            available: params.delete("available") === "true",
                            featured: params.delete("featured") === "true",
                            sort: params.delete("sort") || "default",
                            price: params.delete("price") || 0,
                          });
                        }}
                      >
                        Resetta tutti i filtri
                      </button>
                    </div>
                  )}

                  {/*  */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div>
          <input
            type="text "
            value={searchbar}
            className="searchbar w-100 mb-4"
            placeholder="Cerca nella lista"
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="row g-4 Sans border-top mt-2">
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
        {/* EMPTY STATES */}
        {product.length === 0 && (
          <div className="d-flex justify-content-center Outfit ">
            <h1 className=" pt-3">
              Nessun risultato
              <i className="bi bi-emoji-frown-fill ms-3"></i>
            </h1>
          </div>
        )}
      </section>
    </>
  );
}
