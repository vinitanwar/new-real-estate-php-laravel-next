
import React from 'react'
import Image from 'next/image'
import { MdOutlineSecurity } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { FaSquareParking } from "react-icons/fa6";
import Button from './Button';
import { FaArrowLeftLong } from "react-icons/fa6";
export default function Aboutsection() {


    const servicesData = [
        {
            id: 0,
            title: ' Property Management',
            subhead: ' Nullam sollicitudin blandit eros eu pretium Nullam maximus ultricies auctor.',
            icons: MdOutlineSecurity,
        },
        {
            id: 1,
            title: 'Mortgage Services',
            subhead: ' Nullam sollicitudin blandit eros eu pretium Nullam maximus ultricies auctor.',
            icons: FaHome,
        },
        {
            id: 2,
            title: 'Currency Services',
            subhead: ' Nullam sollicitudin blandit eros eu pretium Nullam maximus ultricies auctor.',
            icons: IoKeySharp,
        },
        {
            id: 3,
            title: 'Parking Services',
            subhead: 'Nullam sollicitudin blandit eros eu pretium Nullam maximus ultricies auctor.',
            icons: FaSquareParking,
        },


    ]


    return (
        <>

            <div className="w-full flex flex-col lg:flex-row justify-between my-4 bg-[#fef7f6] rounded-md">
                <div className="px-5 md:px-16 xl:px-32 py-6 lg:px-[5%] lg:py-[5%]">
                    <h2 className="text-[#181a20] text-xl md:text-2xl tracking-[2px] leading-snug lg:leading-[4rem] font-[550]">
                        Let’s Find The Right
                        <br className='hidden lg:block' />
                        Selling Option For You
                    </h2>

                    <div className="mt-5 relative">
                        {servicesData.map((data) => {
                            return (
                                <div className="flex items-center mb-[30px]" key={data.title}>
                                    <span className="text-white flex justify-center items-center bg-red-200 w-[40px] h-[40px] lg:w-[70px] lg:h-[70px] text-[24px] lg:text-[30px] text-center leading-[60px] lg:leading-[80px] rounded-full">
                                        <data.icons className="text-[#181a20] w-4 h-4 lg:w-7 lg:h-7" />
                                    </span>

                                    <div className="ml-4 mt-2">
                                        <h3 className="text-[#181a20] text-lg lg:text-xl font-semibold">
                                            {data.title}
                                        </h3>
                                        <p className="text-base lg:text-lg">
                                            {data.subhead}
                                            <br />
                                        </p>
                                    </div>
                                </div>
                            );
                        })}

                        <button className="flex px-6 font-semibold text-lg lg:text-xl items-center py-2 border-2 border-black hover:bg-black hover:text-white rounded-xl">
                            Learn More
                            <span>
                                <FaArrowLeftLong className="rotate-[150deg] ml-2" />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block w-[50%] mt-4 lg:mt-0">
                    <Image src='/images/about-us.jpg' className="w-full h-full" width={200} height={400} alt="About Us" />
                </div>



            </div>

          

        </>
    )
}
