import { useEffect, useState } from "react";
import { Area, Pie } from "@ant-design/plots";
import StatisticCard from "../components/statistics/StatisticCard";
import Header from "../components/header/Header";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 60,
    }}
    spin
  />
);

const StatisticPage = () => {
  const [data, setData] = useState();
  const userName = JSON.parse(localStorage.getItem("posUser")) || "customer";

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    await fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/getAll")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const totalAmount = () => {
    const amount = data?.reduce((total, item) => (item.subTotal * item.taxRate) / 100 + item.subTotal + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "Total\nValue",
      },
    },
  };

  return (
    <div>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">Statistics</h1>
      {data ? (
        <div className="px-12 pb-24">
          <div className="statistic-section">
            <h2 className="text-xl">
              Welcome <b className="text-green-700 text-xl">{userName?.username}</b>{" "}
            </h2>
            <div className="statistic-cards grid md:grid-cols-2 xl:grid-cols-4 my-8 gap-4 md:gap-8 ">
              <StatisticCard title={"Total Customers"} amount={data?.length} img={"images/user.png"} />
              <StatisticCard title={"Total Earnings"} amount={totalAmount()} img={"images/money.png"} />
              <StatisticCard title={"Total Sales"} amount={data?.length} img={"images/sale.png"} />
              <StatisticCard title={"Total Products"} amount={"19"} img={"images/product.png"} />
            </div>
            <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 lg:h-full h-72 w-11/12">
                <Area {...config} />;
              </div>
              <div className="lg:w-1/2 lg:h-full h-72 w-11/12">
                <Pie {...config2} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin className="flex justify-center items-center h-[80vh] p-16" indicator={antIcon} />
      )}
    </div>
  );
};

export default StatisticPage;
