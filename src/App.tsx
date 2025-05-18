import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import Products from "./pages/Products/Products";
import Quotes from "./pages/Quotes/Quotes";
import Layout from "./pages/Layout/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="carrinho" element={<ShoppingCart />} />
        <Route path="admin" element={<Products />} />
        <Route path="admin/orcamentos" element={<Quotes />} />
      </Route>
    </Routes>
  );
}

export default App;
