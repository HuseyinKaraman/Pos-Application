import React, { useEffect, useState } from 'react'
import Header from '../components/header/Header'
import Edit from '../components/products/Edit'
import { message } from 'antd';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/getAll");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      message.error(error);
    }
  };

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



  return (
    <>
        <Header />
        <div className="px-6">
            <h1 className="text-4xl font-bold text-center mb-4">Products</h1>
            <Edit products={products} setProducts={setProducts} categories={categories}/>
        </div>
    </>
  )
}

export default ProductPage