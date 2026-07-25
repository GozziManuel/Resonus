import { Link, useParams } from "react-router-dom";
import { useCrudContext } from "../context/CrudContext";
import { useEffect, useState } from "react";
import { useMainContext } from "../context/MainContext";

export default function DetailedPage() {
  // Import Context
  const { detailedProduct } = useCrudContext();
  const { BestsellerSlug } = useMainContext();

  // States
  const [detailed, setDetailed] = useState({});

  // * IMG FOR CAROUSEL
  // img1
  const [image1, setImage1] = useState();
  // img2
  const [image2, setImage2] = useState();
  // img3
  const [image3, setImage3] = useState();

  // animation CAROUSEL
  const [isFading, setIsFading] = useState(false);

  // *MODALE
  const [showModalIMage, setShowModalImage] = useState(false);

  //* Slug
  const { slug } = useParams(); //Getting specific Slug

  // *Translating Promise
  useEffect(() => {
    const gettingDetailed = async () => {
      const array = await detailedProduct(slug);
      setDetailed(array.result); //setting Data
      setImage1(array.result.image_url);
      setImage2(array.result.second_image);
      setImage3(array.result.third_image);
    };
    gettingDetailed();
  }, []);

  // *Data Formattata
  const gettingDate = (Data) => {
    const dateObj = new Date(Data);

    const dateOnly = dateObj.toLocaleDateString("it-IT");

    // Formatting
    const dateTime = dateObj.toLocaleString("it-IT", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    return dateTime;
  };

  //* Carosello
  const handleClick = (Url) => {
    console.log(Url);
    // if () {

    // }
    const url1 = image1;
    const url2 = image2;
    const url3 = image3;
    if (Url === isFading) return;
    if (Url === image1) {
      setShowModalImage(true);
    }
    //
    //
    // Animazione
    setIsFading(true);
    setTimeout(() => {
      if (Url === image2) {
        // Foto 2
        setImage1(url2);
        setImage2(url1);
      } else if (Url === image3) {
        // Foto 3
        setImage1(url3);
        setImage3(url1);
      }
      setIsFading(false);
    }, 250);
  };
  return (
    <section className="Sans mt-5" style={{ padding: "12px" }}>
      <div className="row">
        <div className="col-lg-6 col-sm-12 col-md-12">
          <Link
            className=" mb-4 backToShopButton d-inline-block text-decoration-none"
            style={{ padding: "6px" }}
            to={"/products"}
          >
            <i class="bi bi-arrow-left"> </i> Torna allo shop
          </Link>
          <div
            className=" w-100   d-flex  align-items-start pointer-events-none  gap-3"
            style={{ zIndex: 2 }}
          >
            {/* Solo se in evidenza */}
            {detailed.is_featured === 1 && (
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

          <div className="mt-4">
            <h1 className="Outfit">{detailed.name}</h1>
            <div className="d-flex justify-content-between infoContainerDetailedTop ">
              <p className=" mb-0">{detailed.category_name}</p>
              {detailed.stock === 0 ? (
                <p className="card-text text-danger fw-bold small mb-0">
                  Esaurito
                </p>
              ) : detailed.stock < 20 ? (
                <p className="card-text text-warning small mb-0">
                  Quasi Esaurito!
                </p>
              ) : (
                <p className="card-text text-secondary small mb-0">
                  Disponibile
                </p>
              )}
            </div>
          </div>
          <div className="PriceContainer py-3">
            <p className="mb-1">Prezzo:</p>
            <h2>&euro; {detailed.price}</h2>
          </div>
          <div style={{ width: "70%" }}>
            <p className="my-5">{detailed.description}</p>
          </div>
          <div className="bottomDetailedContainer pt-4 d-flex justify-content-between">
            <p>
              Acquistati:{" "}
              <span className="fw-bold">{detailed.sales_count}</span>
            </p>
            <p>{gettingDate(detailed.created_at)}</p>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12 col-md-12 d-flex flex-column  gap-4 align-items-center">
          <div className="immagineDetailedWrapper">
            <img
              className={`immagineDetailed ${isFading ? "fade-out" : ""}`}
              src={image1}
              alt={detailed.name}
              onClick={() => handleClick(image1)}
            />
          </div>
          <div className="imgContainer d-flex   gap-3 px-2">
            <div className="insideImgsContainer">
              <img
                src={image2}
                alt={detailed.name}
                className="insideImg"
                onClick={() => handleClick(image2)}
              />
            </div>
            {detailed.third_image === "" ? (
              <div className="d-none"></div>
            ) : (
              <div className="insideImgsContainer">
                <img
                  src={image3}
                  alt={detailed.name}
                  className="insideImg"
                  onClick={() => handleClick(image3)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
