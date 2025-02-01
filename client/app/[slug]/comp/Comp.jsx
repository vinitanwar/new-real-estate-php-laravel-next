"use client";

import React, { useState, useEffect, useRef } from "react";

import Modal from "react-modal";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { MdOutlineBed } from "react-icons/md";
import { TbBath } from "react-icons/tb";
import { CiCalendarDate } from "react-icons/ci";
import { PiGarageLight } from "react-icons/pi";
import { GiResize } from "react-icons/gi";
import { GoHome } from "react-icons/go";
import { FaRegClock } from "react-icons/fa";
import { CiHeart, CiShare2 } from "react-icons/ci";
import { BsPrinter } from "react-icons/bs";

import { IoIosArrowBack } from "react-icons/io";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { IoIosExpand } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";

import ContactForm from "@/app/components/ContactForm";
import { getsingleproperty } from "@/app/components/store/slices/singlepropertyslice";
import { apiLink, storageLink } from "@/app/constants";

const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4, // Default number of slides to show
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
  ],
};

const Cards = ({ img, head, add, bed, bath, space, price, cate, flag }) => {
  return (
    <>
      <div className="justify-center relative sm:max-w-[360px] lg:max-w-[350px] overflow-hidden cursor-pointer  bg-white rounded-lg shadow-lg m-2">
        <div className="img-box overflow-hidden relative">
          <Image
            className="w-full h-[220px] transition-transform duration-500 ease-in-out transform hover:scale-110"
            src={img}
            width={200}
            height={200}
            alt={img}
          />
          {cate && (
            <div className="flex absolute  bottom-0 left-0 z-10    bg-opacity-80 items-center justify-between rounded-br-lg">
              <span className="text-white text-md px-4 py-1 after:content after:absolute   after:border-b-[25px] after:border-l-[25px] after:border-l-[transparent]   after:border-b-[#1d5f6fcc]   bg-[#1d5f6fcc] font-bold relative ">
                {cate}
              </span>

              <span className="text-white text-md px-4 py-1 after:content after:absolute  after after:border-b-[25px] after:border-l-[20px] after:border-l-[transparent]   after:border-b-[#e23e1dcc]  bg-[#e23e1dcc] font-bold relative  ">
                ₹ {price}
              </span>
            </div>
          )}

          {flag && (
            <div className="flex absolute px-4 rounded-md py-2 top-1 right-1  bg-[#36c6d3] items-center justify-between">
              <span className="text-white text-md font-bold relative text-[12px]">
                {flag}
              </span>
            </div>
          )}
        </div>

        <div className="my-2 px-4 py-1">
          <h2 className="text-lg text-[#181a20] font-medium transition-all duration-500 ease-in-out hover:underline">
            {head}
          </h2>
          <p className="text-[#717171] text-md mb-[10px]">{add}</p>
          <div className="flex border-[#ddd]">
            <div className="flex items-center text-[13px] mr-[5px] lg:mr-[8px]">
              <MdOutlineBed className="text-xl mr-[6px]" />
              <span className="text-[#717171] text-nowrap">{bed} Bedrooms</span>
            </div>
            <div className="flex items-center text-[13px] mr-[5px] lg:mr-[8px]">
              <TbBath className="text-xl mr-[6px]" />
              <span className="text-[#717171] text-nowrap ">
                {bath} Bathrooms
              </span>
            </div>
            <div className="flex items-center text-[13px] mr-[5px] lg:mr-[8px]">
              <IoIosExpand className="text-xl mr-[6px]" />
              <span className="text-[#717171] text-sm text-nowrap">
                {space} sqft
              </span>
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
      </div>
    </>
  );
};

const SlugComponent = async ({ slug }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.singleproperty);
  const [swiper, setSwiper] = useState(null);
  const [singledata, setsingledata] = useState();

  useEffect(() => {
    dispatch(getsingleproperty(slug));
  }, []);
  useEffect(() => {
    setsingledata(state.data);
  }, [state]);

  console.log(state, "sdkcskdnlcwewcf");

  const [showMore, setShowMore] = useState(false);

  const Overvirw = [
    {
      id: 0,
      title: "Bed",
      content:
        "Discover the world of luxury and elegance with our beautiful and amazing accommodations",
      icon: MdOutlineBed,
      bed: singledata && singledata.bedrooms,
    },
    {
      id: 1,
      title: "Bath",
      content:
        "Experience our exceptional service at our accommodations, which includes personalized check-ins and 24/7 support",
      icon: TbBath,
      bed: singledata && singledata.bathrooms,
    },
    {
      id: 2,
      title: "Year Built",
      content:
        "Experience the magic of our accommodations through our unforgettable experiences, such as dining, shopping, and relaxation",
      icon: CiCalendarDate,
    },
    {
      id: 3,
      title: "Garage",
      content:
        "Experience the magic of our accommodations through our unforgettable experiences, such as dining, shopping, and relaxation",
      icon: PiGarageLight,
    },
    {
      id: 4,
      title: "Sqft",
      content:
        "Experience the magic of our accommodations through our unforgettable experiences, such as dining, shopping, and relaxation",
      icon: GiResize,
    },
    {
      id: 5,
      title: "Property Type",
      content:
        "Experience the magic of our accommodations through our unforgettable experiences, such as dining, shopping, and relaxation",
      icon: GoHome,
    },
  ];

  const dataIcons = [
    {
      id: 0,
      name: "Like",
      icon: CiHeart,
    },
    {
      id: 1,
      name: "share",
      icon: CiShare2,
    },
    {
      id: 2,
      name: "Printer",
      icon: BsPrinter,
    },
  ];

  const imgItems = [
    {
      img: 'https://images.unsplash.com/photo-1594818898109-44704fb548f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"',
    },
    {
      img: "https://images.unsplash.com/photo-1594818896795-35ad7bcf3c6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    {
      img: "https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    },
    {
      img: "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
    },
    {
      img: "https://images.unsplash.com/photo-1649859394614-dc4f7290b7f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      img: "https://images.unsplash.com/photo-1658909914248-15157163c878?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const propertyData = [
    {
      id: singledata && singledata.property_id,
      price: singledata && singledata.price,
      propertySize: "kkk",
      bathrooms: singledata && singledata.bathrooms,
      bedrooms: singledata && singledata.bedrooms,
      garage: 2,
      garageSize: `${singledata && singledata.rate_per_square_feet} SqFt`,
      yearBuilt: 2022,
      propertyType: ["All", "Rent", "Pg", "Buy", "Commercial"][
        singledata && singledata.type
      ],
      propertyStatus: "For Sale",
    },
  ];

  const property = propertyData[0];

  const overview = [
    { key: "Property ID", value: property.id },
    { key: "Price", value: property.price },
    { key: "Property Size", value: property.propertySize },
    { key: "Bathrooms", value: property.bathrooms },
    { key: "Bedrooms", value: property.bedrooms },
    { key: "Garage", value: property.garage },
    { key: "Garage Size", value: property.garageSize },
    { key: "Year Built", value: property.yearBuilt },
    { key: "Property Type", value: property.propertyType },
    { key: "Property Status", value: property.propertyStatus },
  ];

  const agents = [
    {
      id: 1,
      name: "John Doe",
      title: "Senior Agent",
      phoneNumber: "+91 79885 32993",
      img: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const address = "1600 Amphitheatre Parkway, Mountain View, CA";
  const Features = [
    {
      id: 0,
      Name: "Air Conditioning",
    },
    {
      id: 1,
      Name: "Lawn",
    },
    {
      id: 2,
      Name: "Dryer",
    },
    {
      id: 3,
      Name: "Microwave",
    },
    {
      id: 4,
      Name: "Outdoor Shower",
    },
    {
      id: 5,
      Name: "Refrigerator",
    },
    {
      id: 6,
      Name: "TV Cable",
    },
    {
      id: 7,
      Name: "Washer",
    },

    {
      id: 8,
      Name: "WiFi6",
    },
  ];
  const imageUrls = [
    "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Flisting-single-slide4.jpg&w=3840&q=75",
    "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Flisting-single-slide4.jpg&w=3840&q=75",
    "https://homez-appdir.vercel.app/_next/image?url=%2Fimages%2Flistings%2Flisting-single-slide4.jpg&w=3840&q=75",
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const closeModal = () => {
    setSelectedImage(null);
  };

  const [lightboxToggler, setLightboxToggler] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openModal = (index) => {
    setLightboxIndex(index);
    setLightboxToggler(!lightboxToggler);
  };

  useEffect(() => {
    // Ensure fslightbox initializes correctly
    new FsLightbox();
  }, []);

  const topSwiperRef = useRef(null);
  const bottomSwiperRef = useRef(null);

  // Handle click on bottom slider slide
  const handleSlideClick = (index) => {
    if (topSwiperRef.current) {
      topSwiperRef.current.swiper.slideTo(index);
    }
  };
  const handleNextSlide = () => {
    if (topSwiperRef.current) {
      topSwiperRef.current.swiper.slideNext();
    }
  };

  // Handle previous slide for top slider
  const handlePrevSlide = () => {
    if (topSwiperRef.current) {
      topSwiperRef.current.swiper.slidePrev();
    }
  };

  // Handle next slide for bottom slider
  const handleNextSlideBottom = () => {
    if (bottomSwiperRef.current) {
      console.log(bottomSwiperRef.current.swiper.slideNext());
      bottomSwiperRef.current.swiper.slideNext();
    }
  };

  // Handle previous slide for bottom slider
  const handlePrevSlideBottom = () => {
    if (bottomSwiperRef.current) {
      console.log(bottomSwiperRef.current.swiper.slidePrev());

      bottomSwiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      <div className="w-full ">
        <div className="w-full h-auto shadow-lg rounded-md px-5 md:px-16 xl:px-32 py-5 md: bg-white ">
          <div className="w-full relative">
            <Swiper
              spaceBetween={10}
              slidesPerView={1}
              ref={topSwiperRef}
              modules={[Pagination]}
              className="myTopSwiper"
            >
              {singledata &&
                singledata.images_paths &&
                singledata.images_paths.map((info, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <Image
                        className="w-full h-[300px] lg:h-[400px] rounded-2xl  object-fit"
                        width={100}
                        height={200}
                        src={`${storageLink}/${info}`}
                        alt="Slide 2"
                      />
                    </SwiperSlide>
                  );
                })}
            </Swiper>

            <div className="w-full block lg:hidden">
              <div className="absolute  w-full  top-[50%]   z-10 ">
                <div className="flex  justify-evenly relative">
                  <div className="rightArrow absolute left-0 w-10 h-10 flex items-center cursor-pointer  justify-center border rounded-full   hover:text-black text-white border-white text-2xl">
                    <IoIosArrowBack />
                  </div>
                  <div className="leftArrow absolute left-[90%] w-10 h-10 flex items-center justify-center border rounded-full cursor-pointer   hover:text-black text- border-white text-4xl">
                    <IoIosArrowForward />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full my-4 flex justify-betweem items-center">
            <div className=" w-full lg:w-[80%]">
              <Swiper
                loop={true}
                breakpoints={{
                  0: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  700: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
                ref={bottomSwiperRef}
                modules={[Navigation]}
                className="myBottomSwiper"
              >
                {singledata &&
                  singledata.images_paths &&
                  singledata.images_paths.map((info, index) => {
                    return (
                      <SwiperSlide onClick={() => handleSlideClick(index)}>
                        <Image
                          className="w-full h-[90px] lg:h-[150px] rounded-2xl"
                          width={200}
                          height={200}
                          src={`${storageLink}/${info}`}
                          alt="Slide 1"
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>

            <div className="w-[40%]  hidden lg:block ">
              <div className="flex justify-evenly">
                <div
                  className="rightArrow w-16 h-16 flex items-center cursor-pointer  justify-center border rounded-full  hover:bg-black hover:text-white border-black text-4xl"
                  onClick={handlePrevSlideBottom}
                >
                  <IoIosArrowBack />
                </div>
                <div
                  className="leftArrow w-16 h-16 flex items-center justify-center border rounded-full cursor-pointer  hover:bg-black hover:text-white border-black text-4xl"
                  onClick={handleNextSlideBottom}
                >
                  <IoIosArrowForward />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* END Slider Div */}

        {/* Start Content Div */}
        <div className="px-5 md:px-16 xl:px-32 mt-8 ">
        <section className="w-full h-auto py-5 flex flex-col items-center">
  <div className="content-div w-full px-5 flex flex-col lg:flex-row justify-between items-center lg:space-x-8">
    {/* Left Content */}
    <div className="left-content w-full lg:w-1/2 text-center lg:text-left mb-4 lg:mb-0">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold my-2">
        {singledata?.name}
      </h2>
      <div className="flex items-center justify-center lg:justify-start flex-wrap">
        <span className="px-3 py-1 bg-black text-white text-sm rounded-xl">
          FOR SALE
        </span>
        <p className="text-sm md:text-md flex items-center ml-4 mt-2 lg:mt-0 flex-wrap">
          <CiLocationOn className="mr-1" />
          3891 Ranchview Dr. Richardson, California
        </p>
      </div>
    </div>

    {/* Right Content */}
    <div className="right-content w-full lg:w-1/2 flex flex-col items-center lg:items-end">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold my-2 text-center lg:text-right">
        Price: ₹{singledata?.price}
      </h2>
      <span className="text-sm md:text-md lg:text-lg my-2 text-[#00000080] text-center lg:text-right">
        Est. Payment{" "}
        <b className="font-bold text-black">₹8,343/mo*</b>
      </span>
      <div className="flex justify-center lg:justify-end flex-wrap gap-2">
        {dataIcons.map((dataIcon) => (
          <div
            key={dataIcon.id}
            className="flex items-center justify-center border-2 border-transparent hover:border-black text-black px-3 py-2 rounded-md"
          >
            <dataIcon.icon className="text-lg md:text-xl lg:text-2xl" />
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


<div className="w-full flex flex-wrap py-2 mt-2 lg:mt-4">
  <div className="flex-none w-full lg:w-2/3 p-4 left-container min-h-screen">
    {/* Overview Section */}
    <div className="w-full bg-white shadow-lg mb-8 p-6 sm:mb-10 sm:p-10 rounded-xl">
      <h3 className="text-lg sm:text-xl font-semibold my-2">Overview</h3>
      <div className="flex flex-wrap">
        {Overvirw.map((overview) => (
          <div
            key={overview.id}
            className="w-1/2 lg:w-1/3 mb-6 sm:mb-8 flex items-start"
          >
            <div className="flex border-2 hover:border-black mx-2 items-center px-3 py-3 rounded-md">
              <overview.icon className="text-2xl sm:text-4xl" />
            </div>
            <div className="flex flex-col ml-3">
              <span className="font-bold text-sm sm:text-base">
                {overview.title}
              </span>
              <span className="text-sm sm:text-base">{overview.bed}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Property Description Section */}
    <div className="w-full bg-white shadow-lg my-2 mb-8 p-6 sm:p-10 rounded-xl">
      <h3 className="text-xl font-semibold">Property Description</h3>
      <div className="py-4">
        <div className="content-des text-[#181a20]">
          <p className="text-[#181a20] text-justify text-lg font-[400] mb-4">
            {singledata && singledata.property_description_1}
          </p>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showMore ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-[#181a20] text-lg font-normal mb-4">
              {singledata && singledata.property_description_2}
            </p>
          </div>
        </div>
        <button
          className="text-black text-xl underline cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "See Less" : "See More"}
        </button>
      </div>

      <h3 className="text-xl font-semibold">Property Details</h3>
      <div className="grid grid-cols-2 gap-4 my-4 pr-8">
        {overview.map((item, index) => (
          <div key={index} className="flex justify-between p-2 rounded-lg">
            <p className="font-semibold">{item.key}:</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Features & Amenities Section */}
    <div className="w-full bg-white shadow-lg my-2 mb-8 p-6 sm:p-10 rounded-xl">
      <h3 className="text-xl font-semibold">Features & Amenities</h3>
      <div className="py-6">
        <ul className="grid grid-cols-2 sm:grid-cols-2 list-disc list-inside lg:grid-cols-3 gap-4">
          {singledata &&
            singledata.multiple_features &&
            singledata.multiple_features.map((feature) => (
              <li key={feature} className="text-gray-800 text-lg">
                {feature}
              </li>
            ))}
        </ul>
      </div>
    </div>

    {/* Address Section */}
    <div className="w-full bg-white shadow-lg my-2 mb-8 p-6 sm:p-10 rounded-xl">
      <h3 className="text-xl font-semibold">Address</h3>
      <p className="text-gray-600 mb-4">{address}</p>
      <div className="aspect-w-16 aspect-h-9 mb-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d220335.75176122307!2d76.64148314581048!3d30.358164364929934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fb6482e623f7b%3A0x1814169a97109fae!2sAmbala%20Cantt%2C%20Haryana!5e0!3m2!1sen!2sin!4v1720359186685!5m2!1sen!2sin"
          className="w-full h-100 border-0"
        ></iframe>
      </div>
    </div>
  </div>

  <div className="flex-none w-full lg:w-1/3 p-4 right-container h-auto lg:h-[100%] sticky top-[85px]">
    {/* Contact Form Section */}
    <div className="bg-white shadow-lg p-6 rounded-xl mb-8">
      <ContactForm />
    </div>

    {/* Real Estate Agent Section */}
    <div className="bg-white shadow-lg p-6 rounded-xl mb-8">
      <h3 className="text-xl font-semibold">Real Estate Agent</h3>
      <div className="flex flex-wrap gap-4">
        {singledata && (
          <div className="flex w-full mt-4 items-center p-2 rounded-md mb-4 bg-white shadow-sm">
            <img
              src={"https://randomuser.me/api/portraits/men/1.jpg"}
              alt="agent"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex flex-col ml-2">
              <span className="text-gray-800 font-semibold capitalize">
                {singledata.agent_name}
              </span>
              <span className="text-gray-600">{singledata.title}</span>
              <span className="text-gray-600">{singledata.agent_phone}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

        </div>

        <div className="w-full px-5 sm:px-8 md:px-16 xl:px-32 md:py-5">
  <div className="content mb-6 sm:mb-8">
    <h2 className="text-2xl sm:text-3xl xl:text-4xl my-2 text-[#181a20] font-semibold">
      Nearby Similar Homes
    </h2>
    <p className="text-base sm:text-lg text-gray-600">
      Aliquam lacinia diam quis lacus euismod
    </p>
  </div>
  <div className="w-full">
    {/* <Swiper
      spaceBetween={10}
      slidesPerView={1} // Default for small screens
      breakpoints={{
        480: {
          slidesPerView: 2, // For devices >= 480px
        },
        768: {
          slidesPerView: 3, // For devices >= 768px
        },
        1024: {
          slidesPerView: 4, // For devices >= 1024px
        },
      }}
    >
      {cardData?.map((item, index) => (
        <SwiperSlide key={index}>
          <Cards
            img={item.img}
            head={item.head}
            add={item.add}
            bed={item.bed}
            bath={item.bath}
            space={item.space}
            price={item.price}
            cate={item.cate}
            flag={item.flag}
          />
        </SwiperSlide>
      ))}
    </Swiper> */}
  </div>
</div>

      </div>
    </>
  );
};

export default SlugComponent;
