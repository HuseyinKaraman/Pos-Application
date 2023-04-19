import { useSelector,useDispatch } from "react-redux";
import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";


const CreateBill = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total, tax } = useSelector((state) => state.cart);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async(values) => {
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/create", {
        method: "POST",
        body: JSON.stringify({...values, cartItems:cartItems,subTotal:total,taxRate:tax}),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });

      if (res.status === 200) {
          dispatch(reset());
          navigate("/bills")
          message.success("Order is received successfully");
      }else if (res.status === 500){
        message.error("Something went wrong");
      }
    } catch (error) {
      message.error(error);
    }
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
        layout="vertical"
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
        <Form.Item>
          <Card className="w-full" size="small">
            <div className="flex justify-between">
            <span>SubTotal</span>
              <span>{total}₺</span>
            </div>
            <div className="flex justify-between my-2">
            <span>KDV Total %{tax}</span>
              <span className="text-red-600">+{((total * tax) / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <b className="text-xl">Total</b>
              <b className="text-xl">{(total + (total * tax) / 100).toFixed(2)}</b>
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
