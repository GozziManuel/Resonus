export default function Product() {
  return (
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
            <h5 className="card-title text-white fw-bold mt-1">Placeholder</h5>
            <p className="card-text text-secondary small">Placeholder</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap">
            <span className="fs-4 fw-bold mb-3">&euro; placeHolder</span>
            <button className="buttonBasic ">Vedi Prodotto</button>
          </div>
        </div>
      </div>
    </div>
  );
}
