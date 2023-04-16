import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import BillPage from "./pages/BillPage";
import StatisticPage from "./pages/StatisticPage";
import CustomerPage from "./pages/CustomerPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import ProductPage from "./pages/ProductPage";

function App() {
  // const location = useLocation();

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
  if (localStorage.getItem("postUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
