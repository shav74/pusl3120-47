import "./App.css";
import { BrowserRouter as Router, Routes, Route, BrowserRouter, } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignup from "./pages/LoginSignup";
import Footer from "./components/Footer/Footer";
import d_model_banner from './components/Assets/drag-banner.png'
import women_banner from './components/Assets/banner_women.png'
import kid_banner from './components/Assets/banner_kids.png'
import ClientChat from "./pages/ClientChat";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/3dmodels" element={<ShopCategory banner={d_model_banner} category="3dmodels" />} />
          <Route path="/3dprinters" element={<ShopCategory banner={women_banner} category="3dprinters" />} />
          <Route path="/printerparts" element={<ShopCategory banner={kid_banner} category="printerparts" />} />
          <Route path="/ClientChat" element={<ClientChat />} />

          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
