import { HashRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { CrudContextProvider } from "./context/CrudContext";
import { MainContextProvider } from "./context/MainContext";
import DetailedPage from "./Pages/DetailedPage";
import CartPage from "./Pages/CartPage";

function App() {
  return (
    <HashRouter>
      <CrudContextProvider>
        <MainContextProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route element={<HomePage />} path="/" />
              <Route element={<ProductPage />} path="/products" />
              <Route element={<DetailedPage />} path="/products/:slug" />
              <Route element={<CartPage />} path="/carrello" />
              <Route element={<NotFoundPage />} path="*" />
            </Route>
          </Routes>
        </MainContextProvider>
      </CrudContextProvider>
    </HashRouter>
  );
}

export default App;
