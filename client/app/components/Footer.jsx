"use client";

import React from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa6";


export default function Footer() {
  return (
    <footer
      className="w-full bg-cover bg-center pt-10"
      style={{ backgroundImage: `url('/images/footer-bg.jpg')` }}
    >
      <div className="container mx-auto px-5 md:px-16 xl:px-32">
        {/* Logo and Social Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 py-4 border-b border-[#ffffff1a]">
          <div className="flex items-center justify-center sm:justify-start mb-4 sm:mb-0">
            <Image
              src="/images/logos.png"
              className="logo w-[150px] lg:w-[200px] filter brightness-600"
              width={40}
              height={40}
              alt="Logo"
            />
          </div>
          <div className="social-icons flex justify-center sm:justify-end gap-4 text-xl text-white">
            <Link href="https://www.facebook.com" >
              <FaFacebookF className="text-white hover:text-blue-300" />
            </Link>
            <Link href="https://twitter.com" >
              <FaTwitter className="ttext-white hover:text-blue-300" />
            </Link>
            <Link href="https://www.instagram.com" >
              <FaInstagram className="text-white hover:text-blue-300" />
            </Link>
            <Link href="https://www.linkedin.com" >
              <FaLinkedin  className="text-white hover:text-blue-300" />
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 border-b border-[#ffffff1a] pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Popular Links */}
            <div>
              <h6 className="mb-4 text-white font-semibold text-sm uppercase">
                Popular Links
              </h6>
              <ul className="text-[#bebdbd] space-y-3 text-sm">
                <li>
                  <Link href="/">
                    <span className=" hover:text-white">PG for Rent</span>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <span className="hover:text-white">Buy Apartment</span>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <span className="hover:text-white">Plot for Rent</span>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <span className="hover:text-white">Commercial</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h6 className="mb-4 text-white font-semibold text-sm uppercase">
                Quick Links
              </h6>
              <ul className="text-[#bebdbd] space-y-3 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="hover:text-white">
                    Listing
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="hover:text-white">
                    Property
                  </Link>
                </li>
                <li>
                  <Link href="/blog " className="hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Discover Links */}
            <div>
              <h6 className="mb-4 text-white font-semibold text-sm uppercase">
                Discover
              </h6>
              <ul className="text-[#bebdbd] space-y-3 text-sm">
                <li>Miami</li>
                <li>Los Angeles</li>
                <li>Chicago</li>
                <li>New York</li>
              </ul>
            </div>
          </div>

          {/* Contact Info and Newsletter */}
          <div className="flex flex-col gap-y-5">
            <div className="text-white xl:hidden ">
              <p className="text-[#bebdbd] text-sm">Total Free Customer Care</p>
              <h6 className="font-semibold text-lg">+(0) 123 050 945 02</h6>
            </div>
            <div className="text-white xl:hidden">
              <p className="text-[#bebdbd] text-sm">Need Live Support?</p>
              <h6 className="font-semibold text-lg">hi@trc.com</h6>
            </div>

            <div className="hidden xl:flex gap-x-10">
              <div className="text-white  ">
                <p className="text-[#bebdbd] text-sm">
                  Total Free Customer Care
                </p>
                <h6 className="font-semibold text-lg">+(0) 123 050 945 02</h6>
              </div>
              <div className="text-white ">
                <p className="text-[#bebdbd] text-sm">Need Live Support?</p>
                <h6 className="font-semibold text-lg">hi@trc.com</h6>
              </div>
            </div>
            <div>
              <h6 className="text-white font-semibold text-lg mb-4">
                Keep Yourself Up to Date
              </h6>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-12 w-full px-4 pr-20 rounded-lg text-gray-800 font-medium focus:outline-none"
                />
                <button className="absolute right-4 top-2 bg-transparent text-gray-900 font-semibold">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white text-sm mb-2 sm:mb-0">
              © {new Date().getFullYear()} Tricity Real Estate (TRS)
            </p>
            <p className="text-white text-sm mb-2 sm:mb-0">
              <Link href="https://www.futuretouch.in/" target="_blank">
                Designed by ❤️ Future IT Touch Pvt. Ltd
              </Link>
            </p>
            <p className="text-white text-sm">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy
              </Link>{" "}
              ·{" "}
              <Link href="/terms-and-condition" className="hover:underline">
                Terms
              </Link>{" "}
              ·{" "}
              <Link href="/sitemap" className="hover:underline">
                Sitemap
              </Link>
            </p>{" "}
          </div>
        </div>
      </div>
    </footer>
  );
}
