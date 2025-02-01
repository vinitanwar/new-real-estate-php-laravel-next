'use client'

import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { VscSettings } from "react-icons/vsc";
import { FaHome } from "react-icons/fa";


import { RxCross2 } from "react-icons/rx";

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  ChakraProvider,
  Box,
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';



const FilterPopup = ({ isOpen, onClose, onApply }) => {
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [location, setLocation] = useState('');
  const [squareFeet, setSquareFeet] = useState('');

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

          <div className='flex px-8 py-4 items-center border-b-2 border-[#ddd]'>
            <h2 className='font-semibold text-2xl text-[#181a20]'>
              More Filter
            </h2>
            <span className='bg-[#f7f7f7] px-2 py-2 cursor-pointer text-2xl font-semibold rounded-full ml-auto' onClick={onClose}>
              <RxCross2 />
            </span>
          </div>

          <div className='px-8 pb-8 mt-4'>
            <div className="mb-4">
              <label className="block text-md font-bold text-gray-700">Price Range</label>
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
                aria-label={['min', 'max']}
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
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Square Feet</label>
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


export default function Hero() {

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterOpen = () => setIsFilterOpen(true);
  const handleFilterClose = () => setIsFilterOpen(false);
  const handleFilterApply = () => {
    // Add your filter apply logic here
    setIsFilterOpen(false);
  };


  const [activeTab, setActiveTab] = useState('Buy');
  return (
    <>
      <div className="w-full">
        <div className="bgImgcover">
          <div className="px-4 py-2 lg:px-[9%]  lg:py-[8%] ">
            <h2 className="text-[#181a20] text-[30px] lg:text-5xl mb-4  leading-[30px] lg:leading-[4rem]  font-[550]  ">
              Easy Way to Find a &nbsp; 
              <br className='hidden lg:block' />
               Perfect Property


            </h2>

            <p className="text-[#181a20] text-lg my-2">
              From as low as $10 per day with limited time offer discounts
            </p>

            <div className='relative mt-12 lg:mt-10'>
              <ul className='w-full flex max-w-[240px] p-0 m-0 border-b border-[#ddd] rounded-t-md justify-center bg-white'>
                {['Buy', 'Rent', 'Sold'].map((tab) => (
                  <li className='overflow-hidden relative' key={tab}>
                    <button
                      className={`py-[13px] mr-[10px] px-[15px] ${activeTab === tab ? 'text-black font-semibold border-b-[2px] rounded-sm  border-black' : 'text-[#717171]'
                        }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
              <div className='bg-white w-full max-w-[90%] md:max-w-[70%] p-[20px] flex flex-col items-center rounded-b-xl rounded-r-xl'>
                <div className='flex w-full justify-center items-center px-5 flex-wrap lg:flex-nowrap'>
                  <div className='relative w-full'>
                    <input
                      type='text'
                      className='w-full rounded-xl pl-10 bg-[#f7f7f7] py-4 px-4'
                      placeholder={`Search Products For ${activeTab}`}
                    />
                    <span className='text-slate-800 text-2xl opacity-[.6] absolute top-4 left-2'>
                      <FaHome />
                    </span>
                  </div>
                  <div className='flex items-center ml-auto'>
                    <span className='flex mr-4 mx-3 justify-center items-center text-xl' onClick={handleFilterOpen}>
                      <VscSettings className='mx-3' />
                      <span className='mx-2 font-semibold'>Advanced</span>
                    </span>
                    <span className='flex w-12 h-12 text-center justify-center font-semibold text-lg lg:text-xl items-center py-2 border-2 border-black hover:bg-black hover:text-white rounded-full'>
                      <FaSearch />
                    </span>
                  </div>
                </div>
              </div>
            </div>



          </div>



        </div>

        <FilterPopup isOpen={isFilterOpen} onClose={handleFilterClose} onApply={handleFilterApply} />

      </div>
    </>
  )
}
