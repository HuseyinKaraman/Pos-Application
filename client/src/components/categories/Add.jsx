import { Button, Form, Input, Modal, message } from "antd";
import React from "react";

const Add = ({ isAddModalOpen, setIsAddModalOpen, getCategories }) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      await fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/add", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      message.success("Category added successfully!");
      form.resetFields();
      getCategories();
      setIsAddModalOpen(false);
    } catch (error) {
      message.error(error);
    }
  };
  return (
    <Modal title="Add New Category" open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={false}>
      <Form layout="vertical" className="!mt-5" onFinish={onFinish} form={form}>
        <Form.Item label="Category Title" name="title" rules={[{required: true,message: "Category Title is required!",}]}>
          <Input />
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
