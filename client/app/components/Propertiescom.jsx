"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// import { MdOutlineElectricBolt } from "react-icons/md";

// import { FaHeart, FaShareAlt } from 'react-icons/fa';

import { MdOutlineBed } from "react-icons/md";
import { TbBath } from "react-icons/tb";
import { IoIosExpand } from "react-icons/io";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { getProperty } from "./store/slices/propertySlice";
import { storageLink } from "../constants";

export default function Slidercom() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setisloading] = useState(false);
  const state = useSelector((state) => state.propertySlice);
  const [newData, setNewData] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setisloading(true);
    dispatch(getProperty());
    setisloading(false);
  }, []);

  const data = state.data && state.data;
  useEffect(() => {
    if (!activeCategory) {
      setNewData(data);
    } else {
      const filteredData = data.filter((item) => item.type == activeCategory);
      setNewData(filteredData);
    }
  }, [data, activeCategory]);

  return (
    <>
      <div className="w-full px-5 md:px-16 xl:px-32 py-10">
        <div className="content flex justify-between items-center ">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl my-2 sm:my-4 lg:my-6 text-[#181a20] font-semibold">
              Discover Popular Properties
            </h2>
            <p className="text-base sm:text-lg lg:text-xl">
              Aliquam lacinia diam quis lacus euismod
            </p>
          </div>

          <div className="hidden lg:flex ">
            {["All", "Rent", "Pg", "Buy", "Commercial"].map((value, index) => (
              <button
                key={index}
                className={`px-4 py-[7px] mr-[10px] text-[18px] font-semibold text-black border-2 rounded-[6px] border-black ${
                  activeCategory == index ? "bg-black text-white" : ""
                }`}
                onClick={() => setActiveCategory(index)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="cards-container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4   lg:gap-4   mt-4 lg:mt-8 relative">
            {isLoading ? (
  <>
    <div className="animate-pulse">
      <div className="w-full h-[220px] bg-gray-300"></div>

      <div className="my-2 px-4 py-1">
        <div className="h-5 bg-gray-300 rounded-md mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2 w-1/2"></div>

        <div className="flex space-x-3">
          <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
        </div>

        <hr className="mt-2 bg-gray-300" />

        <div className="flex justify-between my-3">
          <div className="h-4 w-1/3 bg-gray-300 rounded-md"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  </>
) : (
  Array.isArray(newData) && newData.length > 0 ? (
    newData.map((item, index) => (
      <Cards
        key={index}
        img={item.images_paths?.[0] || "default-image.jpg"} // Fallback for missing images
        head={item.name}
        add={item.address}
        bed={item.bedroom}
        bath={item.bathroom}
        slug={item.slug}
        space={item.rate_per_square_feet}
        price={item.price}
        cate={item.type}
        flag={item.type}
      />
    ))
  ) : (
    <p className="text-center text-gray-500">No data available.</p>
  )
)}

        </div>
      </div>
    </>
  );
}

const Cards = ({
  img,
  head,
  add,
  bed,
  slug,
  bath,
  space,
  price,
  cate,
  flag,
  isLoading,
}) => {
  return (
    <>
      <div className="relative sm:max-w-[360px] lg:max-w-[400px] overflow-hidden cursor-pointer bg-white rounded-lg shadow-lg m-2">
        {isLoading ? (
          // Skeleton Loader
          <div className="animate-pulse">
            {/* Image Box Skeleton */}
            <div className="w-full h-[220px] bg-gray-300"></div>

            {/* Text Skeleton */}
            <div className="my-2 px-4 py-1">
              <div className="h-5 bg-gray-300 rounded-md mb-2 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded-md mb-2 w-1/2"></div>

              {/* Icon Skeletons */}
              <div className="flex space-x-3">
                <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
              </div>

              <hr className="mt-2 bg-gray-300" />

              {/* Price Skeleton */}
              <div className="flex justify-between my-3">
                <div className="h-4 w-1/3 bg-gray-300 rounded-md"></div>
                <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
              </div>
            </div>
          </div>
        ) : (
          // Actual Content
          <Link href={`/${slug}`}>
            <div className="img-box overflow-hidden relative">
              <Image
                className="w-full h-[220px] transition-transform duration-500 ease-in-out transform hover:scale-110"
                src={`${storageLink}/${img}`}
                width={200}
                height={200}
              />
              {cate && (
                <div className="flex absolute bottom-0 left-0 z-10 bg-opacity-80 items-center justify-between rounded-br-lg">
                  <span className="text-white text-md px-4 py-1 bg-[#1d5f6fcc] font-bold">
                    {cate}
                  </span>
                  <span className="text-white text-md px-4 py-1 bg-[#e23e1dcc] font-bold">
                    ₹ {price}
                  </span>
                </div>
              )}
              {flag && (
                <div className="flex absolute px-4 rounded-md py-2 top-1 right-1 z-10 bg-[#36c6d3] items-center">
                  <span className="text-white text-md font-bold text-[12px]">
                    {flag}
                  </span>
                </div>
              )}
            </div>
            <div className="my-2 px-4 py-1">
              <h2 className="text-lg text-[#181a20] font-medium hover:underline">
                {head}
              </h2>
              <p className="text-[#717171] text-md mb-[10px]">{add}</p>
              <div className="flex border-[#ddd]">
                <div className="flex items-center text-[13px] mr-[5px]">
                  <MdOutlineBed className="text-xl mr-[6px]" />
                  <span className="text-[#717171]">{bed} Bedrooms</span>
                </div>
                <div className="flex items-center text-[13px] mr-[5px]">
                  <TbBath className="text-xl mr-[6px]" />
                  <span className="text-[#717171]">{bath} Bathrooms</span>
                </div>
                <div className="flex items-center text-[13px] mr-[5px]">
                  <IoIosExpand className="text-xl mr-[6px]" />
                  <span className="text-[#717171]">{space} sqft</span>
                </div>
              </div>
              <hr className="mt-2 bg-[#ddd]" />
              <div className="flex justify-between my-3">
                <h4>{cate}</h4>
                <div>
                  <span className="text-[#717171] font-semibold text-[13px]">
                    ₹{price}
                  </span>
                  <span className="text-[#717171] font-semibold text-[13px]">
                    /mo
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};
