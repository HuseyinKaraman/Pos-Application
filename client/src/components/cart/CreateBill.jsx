import { Button, Card, Form, Input, Modal, Select } from "antd";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    setIsModalOpen(false);
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
  };

  return (
    <Modal title="Order Form" open={isModalOpen} footer={false} onCancel={handleCancel}>
      <Form
        {...layout}
        name="nest-messages"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={"customerName"}
          label="Customer Fullname"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input maxLength={11} />
        </Form.Item>
        <Form.Item
          label="Payment Mode"
          name={"paymentMode"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select Payment Mode">
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="cart">Credit Cart</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 20, offset: 2 }}>
          <Card className="w-full" size="small">
            <div className="flex justify-between">
              <span>SubTotal</span>
              <span>399₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV Total %8</span>
              <span className="text-red-600">+27.92₺</span>
            </div>
            <div className="flex justify-between">
              <b className="text-xl">Total</b>
              <b className="text-xl">426.92₺</b>
            </div>
            <div className="flex justify-end">
              <Button type="primary" className="mt-4 w-36" htmlType="submit">
                Validate
              </Button>
            </div>
          </Card>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBill;
