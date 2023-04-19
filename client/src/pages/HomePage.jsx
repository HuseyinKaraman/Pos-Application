import { useEffect, useState } from "react";
import { message, Spin } from "antd";
import {LoadingOutlined } from "@ant-design/icons";
import CartTotals from "../components/cart/CartTotals";
import Categories from "../components/categories/Categories";
import Header from "../components/header/Header";
import Products from "../components/products/Products";


const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 60,
    }}
    spin
  />
);

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const getCategories = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/categories/getAll");
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

  const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/products/getAll");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);




  return (
    <>
      <Header setSearch={setSearch} />
      {categories && products ? (
        <div className="home px-6 flex justify-between gap-8 flex-col md:flex-row">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-8">
            <Categories
              categories={categories}
              getCategories={getCategories}
              setCategories={setCategories}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>
          <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] min-h-[500px] pb-12">
            <Products categories={categories} selectedCategory={selectedCategory} search={search} products={products} getProducts={getProducts} />
          </div>
          <div className="cart-wrapper h-[600px] md:h-[calc(100vh_-_83px)] min-w-[200px] md:min-w-[300px] md:-mr-6 md:-mt-6 border !mb-28 md:!mb-0">
            <CartTotals />
          </div>
        </div>
      ) : (
        <Spin className="flex justify-center items-center h-[80vh] p-20" indicator={antIcon}></Spin>
      )}
    </>
  );
};

export default HomePage;
