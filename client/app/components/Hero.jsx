"use client";

import React, { useState, useRef, useEffect } from "react";

import { IoIosSearch } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  ChakraProvider,
  Box,
} from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getbanner } from "./store/slices/bannerimgSlice";
import { storageLink } from "../constants";

// const images = [
//   { src: 'https://plus.unsplash.com/premium_photo-1680582107403-04dfac02efc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 1' },
//   { src: 'https://images.unsplash.com/photo-1460472178825-e5240623afd5?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 2' },
//   { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', alt: 'Image 3' }
// ];

export default function Hero() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.bannerimg);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [images, setimages] = useState();
  const handleFilterOpen = () => setIsFilterOpen(true);
  const handleFilterClose = () => setIsFilterOpen(false);
  const handleFilterApply = () => {
    // Add your filter apply logic here
    setIsFilterOpen(false);
  };

  useEffect(() => {
    dispatch(getbanner());
  }, []);
  useEffect(() => {
    setimages(state);
  }, [state]);

  const [selectedOption, setSelectedOption] = useState("All residential");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [location, setLocation] = useState("");

  const [searchTerm, setSearchTerm] = useState(location);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [activeTab, setActiveTab] = useState("Buy");

  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdoenOpen, setdropdoenOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const city = response.data.address.city;

          // Update state
          setLocation(city);
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      });
    }
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      const requestBody = {
        country: "India",
      };

      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      const jsData = await response.json();

      //  console.log(jsData.data)

      setCities(jsData.data);
      setFilteredCities(jsData.data);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    setFilteredCities(
      cities.filter((city) =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, cities]);

  // const citiesSs = citiesData.map(city => ({ name: city }));

  return (
    <>
      <div className="flex justify-center flex-col relative items-center ">
        <Slider {...settings} className="w-full h-full overflow-hidden">
          {images && images.data.length > 0
            ? images.data.map((img, index) => (
                <div
                  key={index}
                  className="h-[300px] lg:h-[500px] relative z-10"
                >
                  <img
                    src={`${storageLink}/${img.image}`}
                    alt={img.image}
                    className="w-full h-full object-fill"
                  />
                  <div className="absolute inset-0 z-20 bg-black opacity-50"></div>
                </div>
              ))
            : // Skeleton Loader
              Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[300px] lg:h-[500px] relative z-10 overflow-hidden rounded-md"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-skeleton"></div>
                </div>
              ))}
        </Slider>

        <div className="w-[90%] lg:w-[50%] h-auto  rounded-lg shadow-lg mx-auto mt-0  absolute top-[5rem] lg:top-[9rem]">
          <h2 className=" lg:text-4xl md:text-2xl text-white font-semibold  my-4 ">
            Properties To {activeTab} In &nbsp;
            <span>{location ? location : location}</span>
          </h2>

          <div className="wrapper  lg:border-[#a59e9e] p-0 m-0 lg:border lg:rounded-bl-[54px] lg:rounded-br-[54px]	  lg:backdrop-blur-sm lg:rounded-t-[25px] lg:justify-center lg:bg-[#0d0a0a40] ">
            <ul className="w-full  flex p-0 m-0 justify-center mb-2 ">
              {["Buy", "Rent", "Commercial", "PG", "Plots"].map((tab) => (
                <li
                  className={`overflow-hidden rounded-md mr-[4px] lg:bg-transparent   relative ${
                    activeTab === tab
                      ? "bg-white text-black lg:text-white "
                      : "bg-[#00000033]"
                  }`}
                  key={tab}
                >
                  <button
                    className={` py-[6px] text-[13px] lg:text-[18px] px-[12px] lg:py-[8px] uppercase mr-[5px] lg:px-[10px]  relative ${
                      activeTab === tab
                        ? 'font-semibold  after:content-[""] after:absolute after:bottom-1 after:rounded-[20px] after:left-0 after:w-full after:h-[2px] after:bg-white'
                        : "text-[#ffffffb3]"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>

            <div className="bg-white w-full max-w-[100%]  flex flex-col items-center  rounded-[200px] px-2 ">
              <div className="flex w-full justify-start lg:justify-center  items-centerlg:flex-nowrap ">
                <div className="relative w-full flex py-2">
                  <div className="hidden lg:block">
                    <div className="relative flex justify-center  border-r-2  ">
                      <input
                        type="text"
                        placeholder="Search city"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={() => setdropdoenOpen(!dropdoenOpen)}
                        className="w-full px-4 py-2 mt-1 rounded-[200px]    focus:outline-none pr-10"
                      />
                      <span
                        className="absolute inset-y-0 right-0 flex items-center py-4 pr-3 cursor-pointer"
                        onClick={() => setdropdoenOpen(!dropdoenOpen)}
                      >
                        {dropdoenOpen ? (
                          <FaChevronDown className="h-5 w-5 text-gray-400" />
                        ) : (
                          <FaChevronUp className="h-5 w-5 text-gray-400" />
                        )}
                      </span>

                      {dropdoenOpen && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border top-[70px] left-[18px] border-gray-300 rounded-md max-h-60 overflow-y-auto shadow-lg">
                          {cities?.map((city, index) => (
                            <li
                              key={index}
                              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                              onClick={() => {
                                setSearchTerm(city);
                                setdropdoenOpen(!dropdoenOpen);
                              }}
                            >
                              {city}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    className="w-full rounded-xl focus-0  focus:outline-none bg-white py-3 px-4"
                    placeholder={`Search Products For ${activeTab}`}
                  />
                  <span className="text-slate-800 text-2xl opacity-[.6] absolute top-4 left-2"></span>
                </div>
                <div className="flex items-center ml-0 lg:ml-auto lg:mt-0  justify-start  lg:justify-normal ">
                  <div className="hidden lg:block">
                    <span
                      className="flex mr-4  mx-3 justify-center items-center text-xl"
                      onClick={handleFilterOpen}
                    >
                      <VscSettings className="" />
                      <span className="mx-2 font-semibold">Advanced</span>
                    </span>
                  </div>

                  <span className="flex w-12 h-12 text-center justify-center font-semibold text-lg lg:text-xl items-center py-2 border-2 border-black hover:bg-black hover:text-white rounded-full">
                    <Link
                      href={`/${activeTab.toLowerCase()}/${searchTerm.toLowerCase()}`}
                    >
                      <FaSearch />
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FilterPopup
          isOpen={isFilterOpen}
          onClose={handleFilterClose}
          onApply={handleFilterApply}
        />
      </div>
    </>
  );
}

const FilterPopup = ({ isOpen, onClose, onApply }) => {
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [location, setLocation] = useState("");
  const [squareFeet, setSquareFeet] = useState("");

  const handlePriceRangeChange = (values) => {
    setPriceRange(values);
  };

  const handleMinPriceChange = (event) => {
    const min = parseInt(event.target.value, 10);
    setPriceRange([min, priceRange[1]]);
  };

  const handleMaxPriceChange = (event) => {
    const max = parseInt(event.target.value, 10);
    setPriceRange([priceRange[0], max]);
  };

  if (!isOpen) return null;

  return (
    <ChakraProvider>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg w-full max-w-[600px]">
          <div className="flex px-8 py-4 items-center border-b-2 border-[#ddd]">
            <h2 className="font-semibold text-2xl text-[#181a20]">
              More Filter
            </h2>
            <span
              className="bg-[#f7f7f7] px-2 py-2 cursor-pointer text-2xl font-semibold rounded-full ml-auto"
              onClick={onClose}
            >
              <RxCross2 />
            </span>
          </div>

          <div className="px-8 pb-8 mt-4">
            <div className="mb-4">
              <label className="block text-md font-bold text-gray-700">
                Price Range
              </label>
              <div className="flex items-center mt-1">
                <span className="mr-1">₹</span>
                <input
                  type="number"
                  className="w-[50%] py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={priceRange[0]}
                  onChange={handleMinPriceChange}
                  min="0"
                  max={priceRange[1]}
                />
                <span className="mx-2">-</span>
                <span className="mr-1">₹</span>
                <input
                  type="number"
                  className="w-[50%] py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={priceRange[1]}
                  onChange={handleMaxPriceChange}
                  min={priceRange[0]}
                  max="300000"
                />
              </div>
              <RangeSlider
                min={0}
                max={300000}
                step={1000}
                value={priceRange}
                onChange={handlePriceRangeChange}
                mt={2}
                aria-label={["min", "max"]}
              >
                <RangeSliderTrack bg="gray.200">
                  <RangeSliderFilledTrack bg="black" />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0}>
                  <Box color="black" as={MdGraphicEq} />
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={6} index={1}>
                  <Box color="black" as={MdGraphicEq} />
                </RangeSliderThumb>
              </RangeSlider>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Square Feet
              </label>
              <input
                type="number"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter square feet"
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={onApply}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};
