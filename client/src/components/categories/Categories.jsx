import { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";

const Categories = ({ categories, getCategories, setCategories,setSelectedCategory,selectedCategory }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  return (
    <ul className="flex gap-4 md:flex-col text-lg">
      {categories &&
        categories.map((item) => (
            <li className={`category-item ${item.title === selectedCategory ? "!bg-orange-600" :""}`} key={item._id} onClick={()=>setSelectedCategory(item.title)}>
              <span>{item.title}</span>
            </li>
        ))}

      <li className="category-item !bg-purple-800 hover:opacity-90" onClick={() => setIsAddModalOpen(true)}>
        <PlusOutlined className="md:text-2xl" />
      </li>
      <li className="category-item !bg-orange-800 hover:opacity-90" onClick={() => setIsEditModalOpen(true)}>
        <EditOutlined className="md:text-2xl" />
      </li>
      <Add isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} getCategories={getCategories} />
      <Edit isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} categories={categories} setCategories={setCategories} />
    </ul>
  );
};

export default Categories;
