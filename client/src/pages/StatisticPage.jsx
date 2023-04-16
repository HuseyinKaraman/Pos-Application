import { useEffect, useState } from "react";
import { Area,Pie } from "@ant-design/plots";
import StatisticCard from "../components/statistics/StatisticCard";
import Header from "../components/header/Header";

const StatisticPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = async () => {
    await fetch("https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setData(json);
      })
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data,
    xField: "timePeriod",
    yField: "value",
    xAxis: {
      range: [0, 1],
    },
  };

  const data2 = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config2 = {
    appendPadding: 10,
    data : data2,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'AntV\nG2Plot',
      },
    },
  };

  return (
    <div>
      <Header />
      <div className="px-12 pb-24">
        <h1 className="text-4xl font-bold text-center mb-4">Statistics</h1>
        <div className="statistic-section">
          <h2 className="text-xl">
            Welcome <b className="text-green-700 text-xl">admin</b>{" "}
          </h2>
          <div className="statistic-cards grid md:grid-cols-2 xl:grid-cols-4 my-8 gap-4 md:gap-8 ">
            <StatisticCard title={"Total Customers"} amount={"10"} img={"images/user.png"} />
            <StatisticCard title={"Total Earnings"} amount={"1000₺"} img={"images/money.png"} />
            <StatisticCard title={"Total Sales"} amount={"4"} img={"images/sale.png"} />
            <StatisticCard title={"Total Products"} amount={"7"} img={"images/product.png"} />
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
    </div>
  );
};

export default StatisticPage;
