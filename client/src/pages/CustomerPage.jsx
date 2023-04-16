import { Table } from "antd";
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

const CustomerPage = () => {

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
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "7",
      productname: "John",
      category: "icecek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "8",
      productname: "John",
      category: "icecek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "9",
      productname: "John",
      category: "icecek",
      image: "https://images.hindustantimes.com/img/2022/08/07/550x309/cat_1659882617172_1659882628989_1659882628989.jpg",
      unit: 5,
      unitprice: 3,
      totalprice: 15,
    },
    {
      key: "10",
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
      <Header />
      <div className="px-12">
        <h1 className="text-4xl font-bold text-center mb-4">Customers</h1>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          size="middle"
          pagination={{
            pageSize: 7,
            position: ["none", "bottomCenter"],
          }}
          scroll={{
            y: 600,
          }}
        />
      </div>
    </>
  );
};

export default CustomerPage;
