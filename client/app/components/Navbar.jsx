"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { navLink } from "../constants/index";
import Button from "./Button";
import Link from "next/link";
import { FaGoogle, FaPencilAlt } from "react-icons/fa";
import { RiHeadphoneFill } from "react-icons/ri";
import { FcCallback } from "react-icons/fc";
import { MdOutlineHeadphones } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

import Swal from "sweetalert2";
// import 'sweetalert2/src/sweetalert2.scss'

import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import axios from "axios";
import { baseurl } from "./store/baseurl";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const loginUser = JSON.parse(localStorage.getItem("traveldealuser")) || null;

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (activeTab === "signUp") {
    } else {
      // Handle login logic
    }
  };
  const signuphandel = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${baseurl}/Signupcustomer`, {
      name,
      email,
      password,
      phone_number: phoneNumber,
    });

    if (res.data.success) {
      toggleModal();
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      Swal.fire({
        title: "Signup Success",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "ok",
      });
      localStorage.setItem("traveldealuser", JSON.stringify(res.data.user.id));
    } else {
      Swal.fire({
        title: "error",
        text: res.data.message,
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  const Loginhandel = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${baseurl}/logincustomer`, {
      email,
      password,
    });
    if (res.data.success) {
      toggleModal();
      setEmail("");
      setPassword("");
      Swal.fire({
        title: "Login Success",
        text: res.data.message,
        icon: "success",
        confirmButtonText: "ok",
      });
      localStorage.setItem("traveldealuser", JSON.stringify(res.data.user.id));
    } else {
      Swal.fire({
        title: "Error!",
        text: res.data.message,
        icon: "error",
        confirmButtonText: "Try Agyan",
      });
      setPassword("");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countryCodes, setCountryCodes] = useState(["+91"]);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // ...
        },
      },
      auth
    );
  };

  const handleSend = (event) => {
    event.preventDefault();

    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    let phoneNew = "+917988532993";
    signInWithPhoneNumber(auth, phoneNew, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      // verifu otp
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let user = result.user;
          console.log(user);
          alert("User signed in successfully");
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert("User couldn't sign in (bad verification code?)");
        });
    }
  };

  useEffect(() => {
    // Fetch country codes from an API
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const codes = data
          .map((country) => ({
            shortName: country.cca2,
            dialCode:
              country.idd.root +
              (country.idd.suffixes ? country.idd.suffixes[0] : ""),
          }))
          .filter((country) => country.dialCode);
        setCountryCodes(codes);
        console.log(codes);
      })
      .catch((error) => console.error("Error fetching country data:", error));
  }, []);
  // useEffect(() => {
  //   fetch('https://restcountries.com/v3.1/all')
  //     .then(response => response.json())
  //     .then(data => {
  //       const codes = data.map(country => ({
  //         shortName: country.cca2,
  //         dialCode: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '')
  //       })).filter(country => country.dialCode);
  //       setCountryCodes(codes);
  //     })
  //     .catch(error => console.error('Error fetching country codes:', error));
  // }, []);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOtp = () => {
    if (phoneNumber.length === 10) {
      setOtpSent(true); // Ideally, this should trigger an API call to send OTP
    }
  };

  const handleEditPhoneNumber = () => {
    setOtpSent(false);
    setOtp("");
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // const toggleModal = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  const switchTab = (tab) => {
    setActiveTab(tab);
  };
  const [togglecontect, settogglecontect] = useState("");
  const handelLogoutuser = () => {
    localStorage.removeItem("traveldealuser");
    window.location.reload();
    Swal.fire({
      title: "done",
      text: "Logout Success",
      icon: "success",
      confirmButtonText: "ok",
    });
  };

  return (
    <>
      <div className="flex w-full sticky top-0 z-50 px-5 py-3 md:px-16 xl:px-32 lg:py-4 bg-white shadow-md items-center justify-between lg:justify-between">
        <div className=" lg:hidden">
          <button className="text-2xl" onClick={toggleSidebar}>
            <RxHamburgerMenu />
          </button>
        </div>

        <div>
          <Link href="/">
            <img src="/images/logos.png" className="w-32 md:w-40   xl:w-60" />
          </Link>
        </div>

        <div className=" lg:hidden">
          <span className="text-2xl" onClick={toggleModal}>
            <CgProfile className="w-8 h-8 text-gray-600" />
          </span>
        </div>

        <div className="hidden lg:block ml-8">
          <ul className="flex items-center text-xl cursor-pointer font-semibold">
            {navLink.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className="text-gray-600 hover:text-gray-800 mx-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:block">
          <div className="flex items-center gap-3">
            <div
              className="border-[#000000d1] border-[2px] p-1 rounded-full relative  group "
              onMouseEnter={() => settogglecontect("contact")}
            >
              <MdOutlineHeadphones className="    text-2xl " />

              <div
                onMouseLeave={() => settogglecontect("")}
                className={`  fixed right-[20%]   top-16 bg-white translate-y-8 ${
                  togglecontect == "contact" ? "  scale-100" : " scale-0"
                }  origin-top-left duration-300  `}
              >
                <div class="flex items-center px-6 py-3 bg-gray-900">
                  <svg
                    class="h-6 w-6 text-white fill-current"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 48C150 48 64 136.2 64 245.1v153.3c0 36.3 28.6 65.7 64 65.7h64V288h-85.3v-42.9c0-84.7 66.8-153.3 149.3-153.3s149.3 68.5 149.3 153.3V288H320v176h64c35.4 0 64-29.3 64-65.7V245.1C448 136.2 362 48 256 48z" />
                  </svg>
                  <h1 class="mx-3 text-white font-semibold text-lg">
                    Contect Us
                  </h1>
                </div>
                <div class="py-4 px-6">
                  <div className="flex items-center   gap-4">
                    <div>
                      <FcCallback className="text-2xl" />
                    </div>
                    <div>
                      <p class="   text-gray-700">9:00AM - 5:30PM</p>
                      <a
                        class=" text-lg cursor-pointer text-gray-700"
                        href="tel:+4733378901"
                      >
                        {" "}
                        +91 9876543210
                      </a>
                    </div>
                  </div>
                  <div class="flex items-center mt-4 text-gray-700">
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
                      <path d="M239.208 343.937c-17.78 10.103-38.342 15.876-60.255 15.876-21.909 0-42.467-5.771-60.246-15.87C71.544 358.331 42.643 406 32 448h293.912c-10.639-42-39.537-89.683-86.704-104.063zM178.953 120.035c-58.479 0-105.886 47.394-105.886 105.858 0 58.464 47.407 105.857 105.886 105.857s105.886-47.394 105.886-105.857c0-58.464-47.408-105.858-105.886-105.858zm0 186.488c-33.671 0-62.445-22.513-73.997-50.523H252.95c-11.554 28.011-40.326 50.523-73.997 50.523z" />
                      <g>
                        <path d="M322.602 384H480c-10.638-42-39.537-81.691-86.703-96.072-17.781 10.104-38.343 15.873-60.256 15.873-14.823 0-29.024-2.654-42.168-7.49-7.445 12.47-16.927 25.592-27.974 34.906C289.245 341.354 309.146 364 322.602 384zM306.545 200h100.493c-11.554 28-40.327 50.293-73.997 50.293-8.875 0-17.404-1.692-25.375-4.51a128.411 128.411 0 0 1-6.52 25.118c10.066 3.174 20.779 4.862 31.895 4.862 58.479 0 105.886-47.41 105.886-105.872 0-58.465-47.407-105.866-105.886-105.866-37.49 0-70.427 19.703-89.243 49.09C275.607 131.383 298.961 163 306.545 200z" />
                      </g>
                    </svg>
                    <h1 class="px-2 text-sm">About</h1>
                  </div>
                  <div class="flex items-center mt-4 text-gray-700">
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
                      <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z" />
                    </svg>
                    <h1 class="px-2 text-sm">Location</h1>
                  </div>
                  <div class="flex items-center mt-4 text-gray-700">
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
                      <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z" />
                    </svg>
                    <h1 class="px-2 text-sm">admin@example.com</h1>
                  </div>
                </div>
              </div>
            </div>

            {loginUser && (
              <div
                className="flex items-center mr-8 text-xl cursor-pointer font-semibold"
                onClick={handelLogoutuser}
              >
                <CgProfile className="w-8 h-8 text-gray-900" />
                <span className="ml-2">Logout</span>
              </div>
            )}
            {!loginUser && (
              <div
                className="flex items-center mr-8 text-xl cursor-pointer font-semibold"
                onClick={toggleModal}
              >
                <CgProfile className="w-8 h-8 text-gray-900" />
                <span className="ml-2">Login</span>
              </div>
            )}
            <Button
              title="Add Property"
              btn="btn"
              icon={<FaArrowLeftLong className="rotate-[150deg] ml-2" />}
            />
          </div>
        </div>

        <div
          className={`fixed inset-0 bg-gray-800 lg:hidden bg-opacity-75 z-40 ${
            isOpen ? "visible" : "hidden"
          }`}
          onClick={toggleSidebar}
        >
          <div
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-6 bg-[#fef5f3] border-b border-[#ddd]">
              <h2 className="font-semibold">Welcome to TRS</h2>
              <button
                onClick={toggleSidebar}
                className="text-white font-semibold w-9 h-9 text-xl bg-orange-500 rounded-full flex items-center justify-center"
              >
                <RxCross2 />
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold">Sidebar Menu</h2>
              <ul>
                <li className="my-2">
                  <a href="#">Menu Item 1</a>
                </li>
                <li className="my-2">
                  <a href="#">Menu Item 2</a>
                </li>
                <li className="my-2">
                  <a href="#">Menu Item 3</a>
                </li>
                <li className="my-2">
                  <a href="#">Menu Item 4</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md lg:max-w-xl w-full relative">
              <div className="p-4 border-b flex justify-between items-center border-[#ddd]">
                <h3 className="text-xl font-medium">Welcome To TRS</h3>
                <button
                  onClick={toggleModal}
                  className="text-white font-semibold w-9 h-9 text-xl bg-orange-500 rounded-full flex items-center justify-center"
                >
                  <RxCross2 />
                </button>
              </div>

              <div className="p-4">
                <div className="flex mb-4 space-x-2">
                  <button
                    className={`w-full py-2 ${
                      activeTab === "login"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } rounded-lg`}
                    onClick={() => handleTabSwitch("login")}
                  >
                    Login
                  </button>
                  <button
                    className={`w-full py-2 ${
                      activeTab === "signUp"
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-gray-700"
                    } rounded-lg`}
                    onClick={() => handleTabSwitch("signUp")}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                  {activeTab === "signUp" ? (
                    <>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
                          placeholder="Enter your phone number"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={signuphandel}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg mb-4"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Password
                        </label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition duration-300"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <button
                        onClick={Loginhandel}
                        className="w-full bg-orange-500 text-white py-2 rounded-lg mb-4"
                      >
                        Login
                      </button>
                    </>
                  )}
                </form>

                <div className="text-center mb-5 relative">
                  <hr className="my-4 h-[1px] border-0 bg-black opacity-55" />
                  <span className="text-gray-600 absolute w-[40px] bg-white text-[20px] top-[-13px] left-[45%]">
                    OR
                  </span>
                </div>

                <button className="w-full bg-white text-gray-700 py-2 rounded-lg border border-gray-300 flex items-center justify-center shadow-sm hover:bg-gray-100 transition duration-300">
                  <FaGoogle className="mr-2" />
                  Continue with Google
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
