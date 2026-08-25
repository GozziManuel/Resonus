import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import NotFoundPage from "./Pages/NotFoundPage";
import { CrudContextProvider } from "./context/CrudContext";
import { MainContextProvider } from "./context/MainContext";
import DetailedPage from "./Pages/DetailedPage";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage";
import GreetingsPage from "./Pages/GreetingsPage";
import GreetingsGuard from "./Components/GuardForGreetings";
import HistoryPage from "./Pages/HistoryPage";

function App() {
  return (
    <BrowserRouter>
      <CrudContextProvider>
        <MainContextProvider>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route element={<HomePage />} path="/" />
              <Route element={<ProductPage />} path="/products" />
              <Route element={<DetailedPage />} path="/products/:slug" />
              <Route element={<CartPage />} path="/carrello" />
              <Route element={<CheckoutPage />} path="/checkout" />
              <Route element={<HistoryPage />} path="/acquisti" />

              <Route
                element={
                  <GreetingsGuard>
                    <GreetingsPage />
                  </GreetingsGuard>
                }
                path="/greetings"
              />
              <Route element={<NotFoundPage />} path="*" />
            </Route>
          </Routes>
        </MainContextProvider>
      </CrudContextProvider>
    </BrowserRouter>
  );
}

export default App;
