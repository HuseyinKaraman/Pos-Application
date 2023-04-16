import React, { useState } from "react";
import { Button, Carousel, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import {useNavigate} from 'react-router-dom'


const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const onFinish = async(values) => {
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      console.log(res);
      if (res.status === 200) {
        message.success("User is successfully register!");
        navigate("/login");
        setLoading(false);
      }else{
        message.error(res.statusText);
      }
    } catch (error) {
        message.error("error");
    }
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
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="flex flex-col w-[480px] mx-auto justify-center px-10 lg:px-20">
          <h1 className="font-bold text-5xl text-center">MYPOS</h1>
          <Form layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} className="mt-16">
            <Form.Item name={"username"} label="Username" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={"email"} label="E-mail" rules={[{ required: true }]}>
              <Input type="email" />
            </Form.Item>
            <Form.Item name={"password"} label="Password" rules={[{ required: true, min: 6 }]}>
              <Input.Password type="password" />
            </Form.Item>
            <Form.Item
              name={"repassword"}
              dependencies={["password"]}
              label="RE-Password"
              rules={[
                { required: true},
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords that you entered do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password type="password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className="w-full" size="large" htmlType="submit" loading={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center w-full">
            Already Register?{" "}
            <Link className="text-blue-600" to="/login">
              Login
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#364d79] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel autoplay>
                <AuthCarousel title={"Reponsive"} description={"Compatibility with all device sizes"} image="images/responsive.svg" />
                <AuthCarousel title={"Statistics"} description={"Detailed statistics"} image="images/statistic.svg" />
                <AuthCarousel
                  title={"Customer Happiness"}
                  description={"At the end of the experience, customers satisfied with the product"}
                  image="images/customer.svg"
                />
                <AuthCarousel title={"Admin Panel"} description={"One Place Management"} image="images/admin.svg" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
