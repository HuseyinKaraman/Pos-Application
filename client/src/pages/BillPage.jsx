import { useEffect, useRef, useState } from "react";
import { Button, Input, Space, Spin, Table } from "antd";
import PrintBill from "../components/bills/PrintBill";
import Header from "../components/header/Header";
import Highlighter from "react-highlight-words";
import { SearchOutlined, LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 60,
    }}
    spin
  />
);

const BillPage = () => {
  const [billItems, setBilItems] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customer, setCustomer] = useState();

  // adding filter panel
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    setSearchText("");
    clearFilters();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div className="p-8" onKeyDown={(e) => e.stopPropagation()}>
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
              clearFilters && handleReset(clearFilters);
              confirm();
            }}
            size="small"
            className="w-[90px]"
          >
            Reset
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (_, record) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={record[dataIndex]}
        />
      ) : (
        record[dataIndex]
      ),
  });

  useEffect(() => {
    const getBills = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/getAll");
        const data = await res.json();
        setBilItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBills();
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      width: "4%",
      ...getColumnSearchProps("customerName"),
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: "4%",
      ...getColumnSearchProps("phoneNumber"),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "4%",
      render: (text) => {
        return <span>{text.substring(0, 10)}</span>;
      },
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      width: "4%",
      ...getColumnSearchProps("paymentMode"),
    },
    {
      title: "Total Price",
      width: "4%",
      render: (_, record) => {
        return <span>{(record.subTotal + (record.subTotal * record.taxRate) / 100).toFixed(2)}₺</span>;
      },
      sorter: (item1, item2) => item1.subTotal + (item1.subTotal * item1.taxRate) / 100 - (item2.subTotal + (item2.subTotal * item2.taxRate) / 100),
    },
    {
      title: "Action",
      key: "action",
      width: "4%",
      render: (_, record) => {
        return (
          <Button
            type="link"
            className="pl-0"
            onClick={() => {
              setIsModalOpen(true);
              setCustomer(record);
            }}
          >
            Print
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Bills</h1>
      {billItems ? (
        <div className="px-12">
          <Table
            dataSource={billItems}
            columns={columns}
            bordered
            size="middle"
            pagination={false}
            scroll={{
              x: 840,
              y: 500,
            }}
            rowKey={"_id"}
          />
        </div>
      ) : (
        <Spin className="flex justify-center items-center h-[80vh] p-16" indicator={antIcon} />
      )}
      {customer && <PrintBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} customer={customer} />}
    </>
  );
};

export default BillPage;

// (
//
// )
