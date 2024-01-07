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
import printers_banner from './components/Assets/printers-banner.png'
import parts_banner from './components/Assets/parts-banner.png'
import ClientChat from "./pages/ClientChat";
import Checkout from "./pages/Checkout";
import Contactus from "./pages/Contactus";
import Aboutus from "./pages/Aboutus";
import Myaccount from "./pages/Myaccount";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/3dmodels" element={<ShopCategory banner={d_model_banner} category="3dmodels" />} />
          <Route path="/3dprinters" element={<ShopCategory banner={printers_banner} category="3dprinters" />} />
          <Route path="/printerparts" element={<ShopCategory banner={parts_banner} category="printerparts" />} />
          <Route path="/clientchat" element={<ClientChat />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/myaccount" element={<Myaccount />} />

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
