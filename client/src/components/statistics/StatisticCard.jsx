import React from "react";

const StatisticCard = ({title,amount,img}) => {
  return (
    <div className="statistic-card-item bg-gray-800 rounded-xl p-6">
      <div className="flex gap-x-4">
        <div className="rounded-full bg-white h-16 w-16 p-3">
          <img src={img} alt="user" className="min-w-[40px] min-h-[40px] "/>
        </div>
        <div className="text-white">
          <p className="text-lg font-medium text-gray-400">{title}</p>
          <p className="text-xl font-semibold  text-gray-200">{amount}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;
