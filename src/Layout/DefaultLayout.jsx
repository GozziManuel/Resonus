import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";
import CartButton from "../Components/CartButton";
import PopUpContainer from "../Components/PopUpContainer";
import { useMainContext } from "../context/MainContext";

export default function DefaultLayout() {
  const { showToast, setShowToast, addedOrRemoved } = useMainContext();

  return (
    <>
      <section className="mainContainer min-vh-100 position-relative ">
        <NavBar />
        <div className="flex-grow-1 ">
          <Outlet />
        </div>
        <Footer />
      </section>
      <CartButton />

      <PopUpContainer
        show={showToast}
        setShow={() => setShowToast(false)}
        addOrRem={addedOrRemoved}
      />
    </>
  );
}
