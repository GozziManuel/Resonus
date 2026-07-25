import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function DefaultLayout() {
  return (
    <section className="mainContainer min-vh-100">
      <NavBar />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <Footer />
    </section>
  );
}
