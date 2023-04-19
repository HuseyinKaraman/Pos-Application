import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import StatisticPage from "./pages/StatisticPage";
import CustomerPage from "./pages/CustomerPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ProductPage from "./pages/ProductPage";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {

  const cart = useSelector(state=> state.cart)

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart])
  

  return (
    <BrowserRouter>
      {/* {location.pathname !== ("/register") && ( location.pathname !== "/login") ? <Header /> : ""} */}
      <Routes>
        <Route path="/" element={ <RouteControl children={<HomePage />} />}/>
        <Route path="/cart" element={ <RouteControl children={<CartPage />}/>} />
        <Route path="/bills" element={ <RouteControl children={<BillPage />}/>} />
        <Route path="/customers" element={ <RouteControl children={<CustomerPage />}/>} />
        <Route path="/statistic" element={ <RouteControl children={<StatisticPage />}/>} />
        <Route path="/products" element={<RouteControl children={<ProductPage />}/>} />
        <Route path="/login" element={ <LoginPage />} />
        <Route path="/register" element={ <RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
