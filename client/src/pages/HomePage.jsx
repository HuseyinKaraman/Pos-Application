import { useEffect, useState } from "react";
import { message } from "antd";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";

const HomePage = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/getAll");
      const data = await res.json();
      data &&
        setCategories(
          data.map((item) => {
            return {
              ...item,
              label: item.title,
              value: item._id,
            };
          })
        );
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Header />
      <div className="home px-6 flex justify-between gap-8 flex-col md:flex-row">
        <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-8">
          <Categories categories={categories} getCategories={getCategories} setCategories={setCategories} />
        </div>
        <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] pb-12">
          <Products categories={categories} />
        </div>
        <div className="cart-wrapper h-[50vh] md:h-[calc(100vh_-_83px)] min-w-[200px] md:min-w-[300px] md:-mr-6 md:-mt-6 border !mb-28 md:!mb-0">
          <CartTotals />
        </div>
      </div>
    </>
  );
};

export default HomePage;
