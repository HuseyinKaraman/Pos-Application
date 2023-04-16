import React from "react";

const AuthCarousel = ({image,title,description}) => {
  return (
    <div className="!flex flex-col justify-end items-center my-10 md:!px-10">
      <img src={image} alt="" className="w-[390px] h-[390px] lg:w-[600px] lg:h-[500px]" />
      <h3 className="text-4xl text-white text-center font-bold">{title}</h3>
      <p className="mt-5 text-2xl text-white text-center">{description}</p>
    </div>
  );
};

export default AuthCarousel;
