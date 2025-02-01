import React from "react";
import { GoArrowUpRight } from "react-icons/go";

const page = () => {
  return (
    <div>
      <section className="relative">
        <iframe
          className="w-full h-96 sm:h-96 md:h-full absolute top-0 left-0 -z-10"
          loading="lazy"
          src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&amp;t=m&amp;z=14&amp;output=embed&amp;iwloc=near"
          title="London Eye, London, United Kingdom"
          aria-label="London Eye, London, United Kingdom"
        ></iframe>

        <form className="bg-white w-full md:w-3/6 lg:w-2/6 shadow-xl p-5 py-14 flex flex-col relative -bottom-44 md:left-16 rounded-2xl gap-6">
          <h2 className="text-2xl font-semibold">Have questions? Get in touch!</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="fname" className="text-xl">First Name</label>
            <input
              type="text"
              id="fname"
              placeholder=" First Name"
              className="border-2 p-1 px-2 text-xl border-[#00000070] rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="lname" className="text-xl">Last Name</label>
            <input
              type="text"
              id="lname"
              placeholder=" Last Name"
              className="border-2 p-1 px-2 text-xl border-[#00000070] rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xl">Your Email</label>
            <input
              type="email"
              id="email"
              placeholder=" Your Email"
              className="border-2 p-1 px-2 text-xl border-[#00000070] rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2">
            <textarea
              rows="4"
              placeholder="There are many variations of passages."
              className="border-2 p-1 px-2 text-xl border-[#00000070] rounded-md"
            />
          </div>
          <div className="bg-orange-600 flex justify-center gap-3 items-center w-full font-semibold text-white p-1 px-5 rounded-md text-2xl">
            <button className="">Submit</button>
            <GoArrowUpRight />
          </div>
        </form>
      </section>

     <div>
     <section className="flex justify-end my-10 px-5  md:px-16 xl:px-32">
        <div className="lg:w-1/3 flex flex-col gap-4">
          <b className="text-3xl sm:text-4xl lg:text-5xl">We’d love to hear from you.</b>
          <p className="text-base sm:text-lg lg:text-xl">
            We are here to answer any question you may have. As a partner of
            corporates, realton has more than 9,000 offices of all sizes and all
            potential of session.
          </p>
        </div>
      </section>

      <section className="my-10">
        <div className="flex flex-col justify-center items-center gap-4">
          <b className="text-3xl sm:text-4xl lg:text-5xl font-bold">Visit Our Office</b>
          <p className="text-base sm:text-lg lg:text-xl">
            Realton has more than 9,000 offices of all sizes and all potential
            of session.
          </p>
        </div>
      </section>

      <section className="flex flex-col sm:flex-row justify-between my-24 px-5 sm:px-10 md:px-24 items-center">
        <div className="flex flex-col gap-3 sm:w-1/2">
          <b className="text-2xl font-semibold">Need help? Talk to our expert.</b>
          <p className="text-base sm:text-lg">
            Talk to our experts or browse through more properties.
          </p>
        </div>
        <div className="flex gap-5 sm:gap-10 mt-5 sm:mt-0">
          <button className="p-2 px-6 text-xl rounded-lg border-2 bg-[#EA580C] text-white">Contact US</button>
          <button className="p-2 px-6 text-xl rounded-lg border-2 bg-[#EA580C] text-white">9876543210</button>
        </div>
      </section>
     </div>
    </div>
  );
};

export default page;
