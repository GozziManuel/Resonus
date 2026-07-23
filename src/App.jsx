import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import DefaultLayout from "./Layout/DefaultLayout";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<ProductPage />} path="/products" />
          <Route element={<NotFoundPage />} path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
