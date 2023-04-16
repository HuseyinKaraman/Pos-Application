import { Button, Form, Input, Modal, Table, message } from "antd";
import React, { useState } from "react";

const Edit = ({ isEditModalOpen, setIsEditModalOpen, categories, setCategories }) => {
  const [editRow, setEditRow] = useState({});

  const onFinish = async (values) => {
    if (Object.keys(editRow).length === 0) {
        return message.error("First edit Category!");
    }
    try {
      await fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/update", {
        method: "POST",
        body: JSON.stringify({ ...values, categoryId: editRow._id }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      setCategories(
        categories.map((item) => {
          if (item._id === editRow._id) {
            return { ...item, title: values.title };
          }
          return item;
        })
      );
      setEditRow({});
      message.success("Category updated successfully!");
    } catch (error) {
      message.error(error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure to delete item?")) {
      try {
        await fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/delete", {
          method: "POST",
          body: JSON.stringify({ categoryId: id }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        });
        setCategories(categories.filter((item) => item._id !== id));
        message.success("Category deleted successfully!");
      } catch (error) {
        message.error(error);
      }
    }
  };

  const columns = [
    {
      title: "Category  Title",
      dataIndex: "title",
      width: "40%",
      key: "title",
      render: (_, record) => {
        if (record._id === editRow._id) {
          return (
            <Form.Item className="mb-0" name="title">
              <Input defaultValue={record.title} />
            </Form.Item>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      key: "action",
      width: "50%",
      render: (_, record) => {
        return (
          <div>
            <Button type="link" onClick={() => setEditRow(record)} className="pl-0 text-blue-700">
              Edit
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-800">
              {" "}
              Save
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
    <Modal title="Edit Category" open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={false}>
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
          pagination={{
            pageSize: 10,
          }}
        />
      </Form>
    </Modal>
  );
};

export default Edit;
