"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { getblog } from "../components/store/slices/blogSlice";
import { storageLink } from "../constants";
import Link from "next/link";
import ContactForm from "../components/ContactForm";

const page = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dispatch = useDispatch();
  const state = useSelector((state) => state.blog);
  const [blogData, setblogData] = useState();

  useEffect(() => {
    dispatch(getblog());
  }, []);
  useEffect(() => {
    setblogData(state.data);
  }, [state]);

  return (
    <div>
      <div className="w-full px-5 md:px-16 xl:px-32 py-10 bg-[#f5f2f0] ">
        <div className="content mb-[20px]">
          <h2 className="text-2xl md:text-3xl xl:text-4xl my-2 text-[#181a20] font-semibold">
            From Our Blog
          </h2>
          <p className="text-lg">Aliquam lacinia diam quis lacus euismod</p>
        </div>
        <div className=" flex flex-col lg:flex-row  relative">
          <div className="w-full lg:w-3/5 flex flex-col   gap-7  ">
            {blogData?.map((data, index) => {
              const dateObj = new Date(data.date);
              const month = monthNames[dateObj.getMonth()];
              const day = dateObj.getDate();

              return (
                <>
                  <BlogNewCard
                    id={data.id}
                    key={index}
                    index={index + 1}
                    month={month}
                    area={data.subheading}
                    title={data.title}
                    img={data.image}
                    date={day}
                  />
                </>
              );
            })}
          </div>
          <div className="w-full lg:w-2/5     ">
            {/* <form class="max-w-md mx-auto    flex flex-col gap-5 sticky top-32 right-0 ">
  <div class="relative z-0 w-full mb-5 group">
      <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div class="relative z-0 w-full mb-5 group">
      <input type="password" name="floating_password" id="floating_password" class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  
  <div class="grid md:grid-cols-2 md:gap-6">
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
    </div>
    <div class="relative z-0 w-full mb-5 group">
        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
    </div>
  </div>
  <div>
  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Your message</label>
  <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
  </div>
  <div className='text-center'>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </div> 
</form> */}
            <div className="sticky top-20  xl:w-5/6 m-auto   bg-white p-6 shadow-2xl rounded-2xl ">
              {" "}
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogNewCard = ({ id, month, area, title, index, img, date }) => {
  return (
    <div className={`   h-auto  my-4 px-2 overflow-hidden  `}>
      {/* w-full h-[220px] transition-transform duration-500 ease-in-out transform hover:scale-110 */}
      <div className="bg-img overflow-hidden rounded-lg">
        <Image
          width={100}
          height={100}
          className="rounded-md transition-transform duration-500 ease-in-out  transform hover:scale-110 w-full h-auto"
          src={`${storageLink}/${img}`}
          alt="Image description" // always good to add alt attribute for accessibility
        />
      </div>
      <div className="bg-content pt-4 pr-5 pb-0 pl-0 relative ">
        <div
          className={`content absolute w-16 h-16 top-[-25px] pt-2 ${
            index % 2 == 0 ? "left-5" : "right-5"
          } text-center shadow-md rounded-md bg-white`}
        >
          <span className="text-base text-slate-500">{month}</span>
          <span className="block text-lg text-[#181a20] font-bold">{date}</span>
        </div>
        <div className={`${index % 2 == 0 ? "text-end" : "text-start"}`}>
          <Link
            href="/"
            className="text-[#717171] text-sm sm:text-base font-normal"
          >
            {area}
          </Link>
          <h6 className="text-base sm:text-lg font-semibold mt-1">{title}</h6>
        </div>
      </div>
    </div>
  );
};

export default page;
