'use client'


import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { baseurl } from './store/baseurl';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''

  });
const user= JSON.parse( localStorage.getItem("traveldealuser"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!user){
 Swal.fire({
    title: 'login',
    text: "Please login first ",
    icon: 'error',
    confirmButtonText: 'Try Agyan'
  })}
  else{
    const newdata={...formData,user_id:user}
const data=await axios.post(`${baseurl}/messagesend`,newdata)
if(data.data.success){
  Swal.fire({
    title: 'send Message',
    text: data.data.message,
    icon: 'success',
    confirmButtonText: 'Done'
  })
  setFormData({
    name: '',
    email: '',
    phoneNumber: '',
    message: ''

  })
}


  }




    
  };

  return (


    <>
      <h3 className="text-xl font-semibold mb-4">Get More Information</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              id="name"
              placeholder='Name'
              name="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee7461]"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Email'
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee7461]"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="number" className="block text-gray-700 font-medium mb-2">Mobile Number</label>
            <input
              type="number"
              id="number "
              name="phone"
              placeholder='Phone Number'
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee7461]"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder='Message'
              rows={8}
              column={10}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee7461]"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full text-xl px-6 py-2 bg-[#eb6753] text-white font-semibold rounded-lg hover:bg-[#ee7461] focus:outline-none focus:ring-2 focus:ring-[#ee7461]"
            >
              Submit
            </button>
          </div>
        </form>
   
    
    </>
     

  
  );
};

export default ContactForm;
