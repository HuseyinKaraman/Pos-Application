import { Button, Form, Input, InputNumber, Modal, Select, Table, message } from "antd";
import React, { useState } from "react";

const Edit = ({ products, setProducts, categories }) => {
  const [form] = Form.useForm();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState({});

  const onFinish = async (values) => {
    try {
      await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/update", {
        method: "POST",
        body: JSON.stringify({ ...values,productId: editingItem._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      setProducts(
        products.map((item) => {
          if (item._id === editingItem._id) {
              return values;
          }
          return item;
        })
      );
      message.success("Product is updated successfully!");
    } catch (error) {
      message.error(error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure to delete item?")) {
      try {
        await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/delete", {
          method: "POST",
          body: JSON.stringify({ productId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        setProducts(products.filter((item) => item._id !== id));
        message.success("Product is deleted successfully!");
      } catch (error) {
        message.error(error);
      }
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "4%",
      render: (_, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      width: "6%",
      render: (_, record) => {
        return <img src={record.img} alt="" className="w-full h-24 md:h-32 object-cover" />;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "4%",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      width: "5%",
      key: "category",
      render: (_,record)=>{
        return categories.filter((category)=>category._id === record.categoryId)[0]?.title;
      }
    },
    {
      title: "Action",
      key: "action",
      width: "4%",
      render: (_, record) => {
        return (
          <div className="flex justify-evenly md:flex-row flex-col">
            <Button
              type="link"
              className="text-blue-700"
              onClick={() => {
                setEditingItem(record);
                setIsEditModalOpen(true);
              }}
            >
              Edit
            </Button>
            <Button type="link" danger onClick={() => deleteCategory(record._id)}>
              Remove
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="max-w-[1600px] mx-auto pb-24 md:overflow-x-hidden">
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        pagination={{
          pageSize: 6,
        }}
        scroll={{
          x: 500,
          y: 800,
        }}
      />

      <Modal title="Add New Product" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={false}>
        <Form layout="vertical" className="!mt-5" onFinish={onFinish} form={form} initialValues={editingItem}>
          <Form.Item label="Product Title" name="title" rules={[{ required: true, message: "Product Title is required!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Product Image" name="img" rules={[{ required: true, message: "Product Image is required!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Product Price" name="price" rules={[{ required: true, message: "Product Price is required!" }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item label="Category" name="categoryId" rules={[{ required: true, message: "Category is required!" }]}>
            <Select
              showSearch
              placeholder="Select Category"
              filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input)}
              filterSort={(optionA, optionB) => (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())}
              options={categories}
            />
          </Form.Item>
          <Form.Item className="text-right mb-0">
            <Button type="primary" htmlType="submit" size="large">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
