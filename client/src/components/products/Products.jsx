import { useState, useEffect } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import Add from "./Add";

const Products = ({ categories, selectedCategory, search, products, getProducts }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filtered, setFiltered] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedCategory === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.categoryId.title === selectedCategory));
    }
  }, [products, selectedCategory, setFiltered]);

  return (
    <div className="grid gap-4 grid-cols-card">
      {/** card'i biz ayrıyeten config.'de yazdık */}
      {products && filtered?.filter((item) => item.title.toLowerCase().includes(search)).map((item) => <ProductItem item={item} key={item._id} />)}
      <div className="!bg-purple-800 product-edit" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-3xl text-white" />
      </div>
      <div
        className="!bg-orange-800 product-edit"
        onClick={() => {
          navigate("/products");
        }}
      >
        <EditOutlined className="md:text-3xl text-white" />
      </div>

      <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} getProducts={getProducts} categories={categories} />
    </div>
  );
};

export default Products;
