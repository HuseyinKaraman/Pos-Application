import { useState } from "react";
import { Button, Card, Table } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import CreateBill from "../components/cart/CreateBill";
import Header from "../components/header/Header";

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (src) => <img className="h-20 w-20 object-cover" src={src} alt="cat" />,
  },
  {
    title: "Product Name",
    dataIndex: "productname",
    key: "productname",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Unit Price",
    dataIndex: "unitprice",
    key: "unitprice",
    render: (text) => <span>{text} ₺</span>,
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    render: (text) => (
      <div className="flex items-center justify-center gap-x-3">
        <Button
          type="primary"
          size="small"
          shape="circle"
          className=" flex justify-center items-center !p-0"
          icon={<PlusOutlined className="align-middle" />}
        ></Button>
        <span className="text-2xl !font-normal">1</span>
        <Button
          type="primary"
          icon={<MinusOutlined />}
          size="small"
          shape="circle"
          className="flex justify-center items-center !p-0"
        ></Button>
      </div>
    ),
  },
  {
    title: "Total price",
    dataIndex: "totalprice",
    key: "totalprice",
    render: (text) => <span>{text} ₺</span>,
  },
];

const CartPage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataSource = [
    {
      key: "1",
      productname: "Mike",
      category: "yemek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "2",
      productname: "John",
      category: "icecek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "3",
      productname: "John",
      category: "icecek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "4",
      productname: "John",
      category: "icecek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "5",
      productname: "John",
      category: "icecek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "6",
      productname: "John",
      category: "icecek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 1,
      unitprice: 20,
      totalprice: 20,
    },
  ];

  return (
    <>
      <Header />
      <div className="px-12">
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          size="middle"
          pagination={false}
          scroll={{
            y: 350,
            x: 525
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="md:w-80">
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
            <Button type="primary" className="w-full mt-4" size="large" onClick={()=>setIsModalOpen(true)}>
              Order
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
  );
};

export default CartPage;
