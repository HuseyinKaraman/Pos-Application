import React from "react";
import { Input, Badge, message } from "antd";
import { SearchOutlined, HomeOutlined, ShoppingCartOutlined, UserOutlined, BarChartOutlined, LogoutOutlined, CopyOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartItems);

  const logOut = () => {
    if (window.confirm("Are you sure logOut?")) {
      localStorage.removeItem("postUser");
      navigate("/login");
      message.warning("user is logout!");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-3 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <Link to="/">
            <h2 className="text-2xl font-bold md:text-4xl">MYPOS</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input prefix={<SearchOutlined />} placeholder="search product..." size="large" className="rounded-full max-w-[800px]" />
        </div>
        <div
          className="menu-links flex justify-between items-center gap-4
              md:static z-50 fixed bottom-0 left-0 md:w-auto w-screen md:bg-transparent bg-white md:border-t-0 border-t
              md:px-0 px-6 py-1 md:py-0"
        >
          <Link to="/" className="menu-link flex flex-col hover:text-amber-600 hover:scale-110 transition-all">
            <HomeOutlined className="text-2xl" />
            <span className="text-[18px]">Home</span>
          </Link>
          <Badge count={cart.length} offset={[-2, 0]} size="small" className="hover:scale-110 hidden md:flex">
            <Link to="/cart" className="menu-link flex flex-col hover:text-amber-600 hover:scale-110 transition-all">
              <ShoppingCartOutlined className="text-2xl -mt-1" />
              <span className="text-[18px]">Cart</span>
            </Link>
          </Badge>
          <Link to="/bills" className="menu-link flex flex-col hover:text-amber-600 hover:scale-110 transition-all">
            <CopyOutlined className="text-2xl" />
            <span className="text-[18px]">Bills</span>
          </Link>
          <Link to="/customers" className="menu-link flex flex-col hover:text-amber-600 hover:scale-110 transition-all">
            <UserOutlined className="text-2xl" />
            <span className="text-[18px]">Users</span>
          </Link>
          <Link to="/statistic" className="menu-link flex flex-col hover:text-amber-600 hover:scale-110 transition-all">
            <BarChartOutlined className="text-2xl" />
            <span className="text-[18px]">Statistics</span>
          </Link>
          <div onClick={logOut}>
            <Link className="menu-link flex flex-col hover:text-amber-600 hover:scale-110 transition-all">
              <LogoutOutlined className="text-2xl" />
              <span className="text-[18px]">Logout</span>
            </Link>
          </div>
        </div>
        <Badge count={cart.length} offset={[0, 3]} size="small" className="hover:scale-110 md:hidden">
          <Link to="/cart" className="menu-link flex flex-col hover:text-amber-600 hover:scale-110 transition-all">
            <ShoppingCartOutlined className="text-3xl" />
            <span className="text-lg">Cart</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
}

export default Header;
