import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function DefaultLayout() {
  return (
    <section className="mainContainer">
      <NavBar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </section>
  );
}
