import { useRef, useState } from "react";
import { Button, Card, Input, Popconfirm, Space, Table, message } from "antd";
import { PlusOutlined, MinusOutlined,SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import Highlighter from 'react-highlight-words';
import CreateBill from "../components/cart/CreateBill";
import Header from "../components/header/Header";

const CartPage = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cartItems, total, tax } = useSelector((state) => state.cart);

  // adding filter panel
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);


  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    setSearchText('');
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex,parameter2) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        className="p-8"
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-8 block"
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className="w-[90px]"
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters && handleReset(clearFilters)
              confirm();
            }}
            size="small"
            className="w-[90px]"
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => close()}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>{
      return parameter2 === undefined ? 
      record.product[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) :
      (record.product[dataIndex])[parameter2].toString().toLowerCase().includes(value.toLowerCase()) 
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (_, record) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={ parameter2 === undefined ?  record.product[dataIndex] : (record.product[dataIndex])[parameter2]}
        />
      ) : (
        parameter2 === undefined ?  record.product[dataIndex] : (record.product[dataIndex])[parameter2]
      ),
  });


  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "4%",
      render: (_, record) => <img className="w-full h-24  object-cover" src={record.product.img} alt={record.product.title} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "4.2%",
      render: (_, record) => <p>{record.product.title}</p>,
      ...getColumnSearchProps('title'),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "4%",
      render: (_, record) => <p>{record.product.categoryId.title}</p>,
      ...getColumnSearchProps("categoryId","title"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "4%",
      render: (_, record) => <p>{record.product.price.toFixed(2)}₺</p>,
      sorter: (item1, item2) => item1.product.price - item2.product.price,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: "4%",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-x-2 md:gap-x-3">
          <Button
            type="primary"
            size="small"
            shape="circle"
            onClick={() => dispatch(increaseQuantity(record))}
            className=" flex justify-center items-center !p-0"
            icon={<PlusOutlined className="align-middle" />}
          ></Button>
          <span className="md:text-2xl !font-normal">{record.quantity}</span>
          <Button
            type="primary"
            icon={<MinusOutlined />}
            size="small"
            shape="circle"
            onClick={() => {
              if (record.quantity === 1) {
                if (window.confirm("Are you sure to delete item?")) {
                  dispatch(decreaseQuantity(record));
                  message.success("item is removed from Cart");
                }
              } else {
                dispatch(decreaseQuantity(record));
              }
            }}
            className="flex justify-center items-center !p-0"
          ></Button>
        </div>
      ),
    },
    {
      title: "Total price",
      key: "totalprice",
      width: "4%",
      render: (_, record) => <p>{(record.product.price * record.quantity).toFixed(2)}₺</p>,
      // sorter: (item1, item2) => (item1.product.price * item1.quantity) - (item2.product.price * item2.quantity),
    },
    {
      title: "Actions",
      key: "actions",
      width: "4%",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete item?"
          onConfirm={() => {
            dispatch(deleteFromCart(record));
            message.success("item is removed from Cart");
          }}
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Cart</h1>
      <div className="px-12 pb-24 md:pb-0">
        <Table
          dataSource={cartItems}
          columns={columns}
          bordered
          size="middle"
          pagination={false}
          scroll={{
            x: 700,
            y: 600,
          }}
          rowKey={(record)=>record.product._id}
        />
        <div className="cart-total flex md:justify-end mt-5 justify-center">
          <Card className="md:w-80 w-full mx-7">
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
            <Button type="primary" className="w-full mt-4" size="large" onClick={() => setIsModalOpen(true)} disabled={cartItems.length === 0}>
              Order
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CartPage;
