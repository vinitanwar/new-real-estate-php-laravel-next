import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {storageLink} from  '../constants'

export default function Blogcard({img,date,month,title,area}) {
  return (
    <>
   <div className='w-full sm:w-[450px] h-auto bg-white my-4 px-2 overflow-hidden'>
  {/* w-full h-[220px] transition-transform duration-500 ease-in-out transform hover:scale-110 */}
  <div className='bg-img overflow-hidden rounded-lg'>
    <Image 
     width={100}
     height={100}
      className='rounded-md transition-transform duration-500 ease-in-out transform hover:scale-110 w-full h-auto' 
      src={`${storageLink}/${img}`} 
      alt="Image description" // always good to add alt attribute for accessibility
    />
  </div>
  <div className='bg-content pt-4 pr-5 pb-0 pl-0 relative'>
    <div className='content absolute w-16 h-16 top-[-25px] pt-2 right-5 text-center shadow-md rounded-md bg-white'>
      <span className='text-base text-slate-500'>
        {month}
      </span>
      <span className='block text-lg text-[#181a20] font-bold'>
        {date}
      </span>
    </div>
    <Link href="/" className='text-[#717171] text-sm sm:text-base font-normal'>
      {area}
    </Link>
    <h6 className='text-base sm:text-lg font-semibold mt-1'>
      {title}
    </h6>
  </div>
</div>

    </>
  )
}
