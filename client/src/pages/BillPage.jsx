import {useState} from "react";
import { Button, Card, Table } from "antd";
import PrintBill from "../components/bills/PrintBill";
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
  }
];

const BillPage = () => {

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
  ];

  return (
    <>
      <Header/>
      <div className="px-12">
        <h1 className="text-4xl font-bold text-center mb-4">Bills</h1>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          size="middle"
          pagination={false}
          // pagination={{
          //   pageSize: 5,
          //   position: ["none", "bottomCenter"],
          // }}
          scroll={{
            y: 350,
          }}
        />
        <div className="cart-total flex justify-end mt-4">
          <Card className="md:w-80">
            <Button type="primary" className="w-full mt-4" size="large" onClick={()=>setIsModalOpen(true)}>
              Print Bill
            </Button>
          </Card>
        </div>
      </div>
      <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </>
  );
};

export default BillPage;
