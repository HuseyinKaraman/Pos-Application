import { Button, Form, Input, Modal, message, InputNumber, Select } from "antd";
import React from "react";

const Add = ({ isAddModalOpen, setIsAddModalOpen, getProducts, categories }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Category added successfully!");
      form.resetFields();
      getProducts();
      setIsAddModalOpen(false);
    } catch (error) {
      message.error(error);
    }
  };

  return (
    <Modal title="Add New Product" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}>
      <Form layout="vertical" className="!mt-5" onFinish={onFinish} form={form}>
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
            Add
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Add;
