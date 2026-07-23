import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import DefaultLayout from "./Layout/DefaultLayout";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { CrudContextProvider } from "./context/CrudContext";
import { MainContextProvider } from "./context/MainContext";

function App() {
  return (
    <MainContextProvider>
      <CrudContextProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route element={<HomePage />} path="/" />
              <Route element={<ProductPage />} path="/products" />
              <Route element={<NotFoundPage />} path="*" />
            </Route>
          </Routes>
        </BrowserRouter>
      </CrudContextProvider>
    </MainContextProvider>
  );
}

export default App;
