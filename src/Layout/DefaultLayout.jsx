import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar";

export default function DefaultLayout() {
  return (
    <section className="mainContainer ">
      <NavBar />
      <div>
        <Outlet />
      </div>
    </section>
  );
}
