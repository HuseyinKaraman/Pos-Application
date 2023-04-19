import React from "react";
import { Input, Badge, message } from "antd";
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined, BarChartOutlined, LogoutOutlined, CopyOutlined } from "@ant-design/icons";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./headerstyle.css";

function Header({ setSearch }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const cart = useSelector((state) => state.cart.cartItems);

  const logOut = () => {
    if (window.confirm("Are you sure logOut?")) {
      localStorage.removeItem("postUser");
      navigate("/login");
      message.warning("user is logout!");
    }
  };

  const changehandle = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <div className="border-b mb-6">
      <header className="py-3 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">MYPOS</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center" onClick={() => pathname !== "/" && navigate("/")}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="search product..."
            size="large"
            className="rounded-full max-w-[800px]"
            onChange={changehandle}
          />
        </div>
        <div className="menu-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}>
            <HomeOutlined className="text-2xl" />
            <span className="text-[18px]">Home</span>
          </NavLink>
          <Badge count={cart.length} offset={[-2, 0]} size="small" className="hover:scale-110 hidden md:flex">
            <NavLink to="/cart" className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}>
              <ShoppingCartOutlined className="text-2xl -mt-1" />
              <span className="text-[18px]">Cart</span>
            </NavLink>
          </Badge>
          <NavLink to="/bills" className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}>
            <CopyOutlined className="text-2xl" />
            <span className="text-[18px]">Bills</span>
          </NavLink>
          <NavLink to="/customers" className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}>
            <UserOutlined className="text-2xl" />
            <span className="text-[18px]">Users</span>
          </NavLink>
          <NavLink to="/statistic" className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}>
            <BarChartOutlined className="text-2xl" />
            <span className="text-[18px]">Statistics</span>
          </NavLink>
          <div onClick={logOut}>
            <Link className="menu-link">
              <LogoutOutlined className="text-2xl" />
              <span className="text-[18px]">Logout</span>
            </Link>
          </div>
        </div>
        <Badge count={cart.length} offset={[0, 3]} size="small" className="hover:scale-110 md:hidden">
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}>
            <ShoppingCartOutlined className="text-3xl" />
            <span className="text-lg">Cart</span>
          </NavLink>
        </Badge>
      </header>
    </div>
  );
}

export default Header;
