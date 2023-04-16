import { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Products = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();


  const getProducts = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/getAll");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="grid gap-4 grid-cols-card">
      {/** card'i biz ayrıyeten config.'de yazdık */}
      {products?.map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}

      <div className="!bg-purple-800 product-edit" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-3xl text-white" />
      </div>
      <div className="!bg-orange-800 product-edit" onClick={()=>{navigate("/products")}}>
          <EditOutlined className="md:text-3xl text-white" />
      </div>

      <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} getProducts={getProducts} categories={categories} />
    </div>
  );
};

export default Products;
