import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import DefaultLayout from "./Layout/DefaultLayout";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route element={<HomePage />} path="/" />
          <Route element={<HomePage />} path="/" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
