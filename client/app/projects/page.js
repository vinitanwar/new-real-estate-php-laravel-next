'use client'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { MdBed } from "react-icons/md";
import { FaBath } from "react-icons/fa6";
import { FaChartArea } from "react-icons/fa";

import { FaShare } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";


import { MdOutlineBed } from "react-icons/md";
import { TbBath } from "react-icons/tb";
import { IoIosExpand } from "react-icons/io";
import { apiLink,storageLink } from '../constants';

import axios from 'axios';

import { RxCross2 } from "react-icons/rx";

import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  ChakraProvider,
  Box,
  Spinner,
} from '@chakra-ui/react';
import { MdGraphicEq } from 'react-icons/md';



const CustomPriceRangeFilter = ({ selectedRange, onApply }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [priceRange, setPriceRange] = useState(selectedRange);
  
    const handlePriceRangeChange = (values) => {
      setPriceRange(values);
    };
  
    const handleMinPriceChange = (event) => {
      const min = parseInt(event.target.value, 10) || 0;
      setPriceRange([min, priceRange[1]]);
    };
  
    const handleMaxPriceChange = (event) => {
      const max = parseInt(event.target.value, 10) || 300000;
      setPriceRange([priceRange[0], max]);
    };
  
    const handleApply = () => {
      onApply(priceRange);
      setIsOpen(false);
    };
  
    return (
      <ChakraProvider>
        <div className="relative inline-block mx-2">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" my-[10px] bg-white border border-gray-300 rounded-[2rem]  px-4 py-2 text-left flex justify-between items-center"
          >
            <span className='font-semibold' >{`₹${priceRange[0]} - ₹${priceRange[1]}`}</span>
            <svg
              className={`w-5 h-5 transform transition-transform ml-4 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute w-[300px] z-20 right-0 md:right-[-138px] bg-white border border-gray-300 rounded-lg shadow-lg mt-2 p-4">
              <div className="mb-4">
                <label className="block text-md font-bold text-gray-700">Price Range</label>
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
              <div className="flex justify-between mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Min Price</label>
                  <input
                    type="number"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Price</label>
                  <input
                    type="number"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md mr-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md"
                  onClick={handleApply}
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </ChakraProvider>
    );
  };
  

const CustomDropdown = ({ options, selectedOption, onOptionSelect,label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block mx-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-[150px] my-[10px] bg-white border border-gray-300 rounded-[2rem]  px-4 py-2 text-left flex justify-between items-center"
      >
        <span className='font-semibold'>{selectedOption}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ml-4 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute p-2 z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
          <label className="block text-md font-bold text-gray-700">{label}</label>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  };


 

const cardData  = [
    {
        id: 0,
        img: '/images/g1-2.webp',
        head: 'Equestrian Family Home',
        add: 'San Diego City, CA, USA',
        bed: 2,
        bath: 2,
        space: 1000,
        price: 100000,
        cate: 'For Rent',
        flag:"Trending"
    },
    {
        id: 1,
        img: '/images/g1-3.webp',
        head: 'Modern Apartment',
        add: 'New York, NY, USA',
        bed: 3,
        bath: 2,
        space: 1200,
        price: 150000,
        cate: 'For Sale',
        flag:"Trending"
    },
    {
        id: 2,
        img: '/images/g1-4.webp',
        head: 'Cozy Cottage',
        add: 'Austin, TX, USA',
        bed: 1,
        bath: 1,
        space: 800,
        price: 85000,
        cate: 'For Rent',
        flag:"Trending"
    },
    {
        id: 3,
        img: '/images/g1-2.webp',
        head: 'Luxury Villa',
        add: 'Miami, FL, USA',
        bed: 5,
        bath: 4,
        space: 2500,
        price: 500000,
        cate: 'For Sale',
        flag:"Trending"
    },
    {
        id: 4,
        img: '/images/g1-3.webp',
        head: 'Beachside Bungalow',
        add: 'Malibu, CA, USA',
        bed: 3,
        bath: 2,
        space: 1500,
        price: 300000,
        cate: 'For Rent',
        flag:"Trending"
    },
    {
        id: 5,
        img: '/images/g1-4.webp',
        head: 'Urban Loft',
        add: 'Chicago, IL, USA',
        bed: 2,
        bath: 1,
        space: 1100,
        price: 175000,
        cate: 'For Sale',
        flag:"Trending"
    },
    {
        id: 2,
        img: '/images/g1-4.webp',
        head: 'Cozy Cottage',
        add: 'Austin, TX, USA',
        bed: 1,
        bath: 1,
        space: 800,
        price: 85000,
        cate: 'For Rent',
        flag:"Trending"
    },
    {
        id: 3,
        img: '/images/g1-2.webp',
        head: 'Luxury Villa',
        add: 'Miami, FL, USA',
        bed: 5,
        bath: 4,
        space: 2500,
        price: 500000,
        cate: 'For Sale',
        flag:"Trending"
    },
    {
        id: 4,
        img: '/images/g1-3.webp',
        head: 'Beachside Bungalow',
        add: 'Malibu, CA, USA',
        bed: 3,
        bath: 2,
        space: 1500,
        price: 300000,
        cate: 'For Rent',
        flag:"Trending"
    },
   
];



const Cards = ({img,head,add,bed, bath,space,price,cate,flag })=>{
    return(<>
 
   
 <div className='relative sm:max-w-[360px] lg:max-w-[400px] overflow-hidden cursor-pointer  bg-white rounded-lg shadow-lg m-2'>
     
     <div className='img-box overflow-hidden relative'>
       <Image
         className='w-full h-[220px] transition-transform duration-500 ease-in-out transform hover:scale-110'
         src={`${storageLink}/${img}`}
         width={200}
         height={200}
       />
       {cate && (


         <div className='flex absolute  bottom-0 left-0 z-10    bg-opacity-80 items-center justify-between rounded-br-lg'>
          
           <span className='text-white text-md px-4 py-1 after:content after:absolute  after:border-l-[25px] after:border-l-[transparent]   bg-[#1d5f6fcc] font-bold relative z-20'>
             {cate}
           </span>

           <span className='text-white text-md px-4 py-1 after:content after:absolute  after    bg-[#e23e1dcc] font-bold relative '>
           ₹ {price}
           </span>


         </div>
       )}
       

{flag && (
         <div className='flex absolute px-4 rounded-md py-2 top-1 right-1   bg-[#36c6d3] items-center justify-between'>
          
           <span className='text-white text-md font-bold relative  text-[12px]'>
             {flag}
           </span>
         </div>
       )}
     </div>
     
     <div className='my-2 px-4 py-1'>
       <h2 className='text-lg text-[#181a20] font-medium transition-all duration-500 ease-in-out hover:underline'>
         {head}
       </h2>
       <p className='text-[#717171] text-md mb-[10px]'>
         {add}
       </p>
       <div className='flex border-[#ddd]'>
         <div className='flex items-center text-[13px] mr-[5px] lg:mr-[8px]'>
           <MdOutlineBed className='text-xl mr-[6px]' />
           <span className='text-[#717171] text-nowrap'>{bed} Bedrooms</span>
         </div>
         <div className='flex items-center text-[13px] mr-[5px] lg:mr-[8px]'>
           <TbBath className='text-xl mr-[6px]' />
           <span className='text-[#717171] text-nowrap '>{bath} Bathrooms</span>
         </div>
         <div className='flex items-center text-[13px] mr-[5px] lg:mr-[8px]'>
           <IoIosExpand className='text-xl mr-[6px]' />
           <span className='text-[#717171] text-sm text-nowrap'>{space} sqft</span>
         </div>
       </div>
       <hr className="mt-2 bg-[#ddd]" />
       <div className='flex justify-between my-3'>
         <h4>
           {cate}
         </h4>
         <div>
           <span className='text-[#717171] font-semibold text-[13px]'>₹{price}</span>
           <span className='text-[#717171] font-semibold text-[13px]'>/mo</span>
         </div>
       </div>
     </div>
   </div>

       
    </>)
}

export default function Page() {
  const [selectedRange, setSelectedRange] = useState([0, 300000]);
  const [selectedType, setSelectedType] = useState('All Type');
  const [selectedBathrooms, setSelectedBathrooms] = useState('All Bathrooms');
  const [selectedBedrooms, setSelectedBedrooms] = useState('All Bedrooms');
  const [selectedSort, setSelectedSort] = useState('Sort by');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({ category: 'All', type: 'All', priceRange: [0, 300000] });

  const handleCategoryChange = (option) => {
    setFilter({ ...filter, category: option });
  };

  const handleTypeChange = (option) => {
    console.log(option)
    setSelectedType(option);
  };

  const handlePriceRangeChange = (priceRange) => {
    setFilter({ ...filter, priceRange });
  };

  const handlePriceRangeApply = (priceRange) => {
    setFilter({ ...filter, priceRange });
  };

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiLink}/property?page=${currentPage}&perPage=6`, {
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            priceRange: selectedRange,
            type: selectedType === 'All' ? undefined : selectedType,
            bedrooms: selectedBedrooms === 'All Bedrooms' ? undefined : selectedBedrooms.replace('+', ''),
            bathrooms: selectedBathrooms === 'All Bathrooms' ? undefined : selectedBathrooms.replace('+', ''),
            sort: selectedSort === 'Sort by' ? undefined : selectedSort,
          }
        });
        setFetchedData(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [selectedRange, selectedType, selectedBathrooms, selectedBedrooms, selectedSort, currentPage]);

  useEffect(() => {
    let data = fetchedData;

    if (filter.category !== 'All') {
      data = data.filter((item) => item.cate === filter.category);
    }

    if (filter.type !== 'All') {
      data = data.filter((item) => item.type === filter.type);
    }

    data = data.filter((item) => item.price >= filter.priceRange[0] && item.price <= filter.priceRange[1]);

    setFilteredData(data);
  }, [filter, fetchedData]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>
      <div className='w-full'>
         <div className="w-full h-auto relative">
        <Image
          width={1920} // Updated to larger width for better scaling
          height={1080} // Updated to maintain aspect ratio
          className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover"
          src="/images/bgimgs.jpg"
          alt="Background Image"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:px-4">
          <h2 className="text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center my-2 font-medium">
            DISCOVER OUR PROPERTIES
          </h2>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center font-normal">
            Each place is a good choice from our wonderful properties.
          </p>
          <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center font-normal my-2">
            Home / For Rent
          </p>
        </div>
      </div>

        <div className='w-full px-5 md:px-16 xl:px-32  py-8 bg-[#f7f7f7]'>
          <div className='flex justify-between flex-col md:flex-row gap-5 mb-5 lg:px-7'>
            <div className='flex flex-row items-center text-nowrap '>
              {/* <CustomDropdown
                options={['All', 'Sale', 'Rent', 'Buy']}
                selectedOption={filter.type}
                onOptionSelect={handleTypeChange}
                label={'Listing Status'}
              /> */}
              <CustomDropdown
              options={['All', 'Sale', 'Rent', 'Buy','Pg','Plots']}
                selectedOption={selectedType}
                onOptionSelect={handleTypeChange}
                label='Type'
              />
              <CustomPriceRangeFilter
                selectedRange={filter.priceRange}
                onApply={handlePriceRangeApply}
              />
            </div>

            <div className='flex items-center px-5 gap-x-2'>
              <span className='text-lg text-gray-600'>
                Sort By
              </span>
              <select
  className="bg-white text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2.5 px-5 font-medium text-sm transition-all duration-300 ease-in-out hover:bg-gray-100"
  onChange={(e) => setSelectedSort(e.target.value)}
>
  {['newest', 'oldest', 'best Seller', 'price lower', 'price upper'].map((value) => {
    const capitalizedValue = value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return (
      <option value={value} key={value}>
        {capitalizedValue}
      </option>
    );
  })}
</select>

            </div>
          </div>

          <div className='flex justify-center '>
            {isLoading ? (
              
              <div className="custom-spinner"></div>
            
            ) : (
              <>

              <div className='cards-container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-4 mt-4 lg:mt-4 relative' > 
              {filteredData.map((property) => (
                  <Cards
                    key={property.id}
                    img={property.images_paths[0]}
                    head={property.title}
                    add={property.address}
                    bed={property.bedrooms}
                    bath={property.bathrooms}
                    space={property.rate_per_square_feet}
                    price={property.price}
                    cate={property.type}
                    flag={property.type ? 'Featured' : ''}
                  />
                ))}
              </div>
              
               


              </>
            )}
          </div>

          <div className='flex justify-center mt-4'>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`mx-2 px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 px-4 py-2 border rounded-md ${index + 1 === currentPage ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`mx-2 px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white hover:bg-gray-100'}`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
