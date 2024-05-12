import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import SignInSignUp from "./pages/SignInSignUp";
import Footer from "./components/Footer/Footer";
import mensBanner from "./assets/img/banner_mens.png";
import womensBanner from "./assets/img/banner_women.png";
import kidsBanner from "./assets/img/banner_kids.png";
import Checkout from "./pages/Checkout";
import ChangeAddress from "./pages/ChangeAddress";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  /* Getting Refresh Token Cookie */
  const getCookie = () => {
    const { login } = Cookies.get();
    if (login) {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    getCookie();
  }, [isLogin]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route path="/" element={<Shop setIsLogin={setIsLogin} />} />
          <Route
            path="/lifestyle"
            element={<ShopCategory banner={mensBanner} category="Lifestyle" />}
          />
          <Route
            path="/running"
            element={<ShopCategory banner={womensBanner} category="Running" />}
          />
          <Route
            path="/sandal-and-flip-flops"
            element={
              <ShopCategory
                banner={kidsBanner}
                category="Sandals & Flip Flops"
              />
            }
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart isLogin={isLogin} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/change-address" element={<ChangeAddress />} />
          <Route path="/login" element={<SignInSignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
