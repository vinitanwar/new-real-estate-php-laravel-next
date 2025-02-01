import React from 'react'

import Image from 'next/image';
export default function Builderslider() {

    const cardsData = [
        { id: 1,
        name: 'Omaxe Infratech',
        totalProjects: 10, 
        projectsInCity: 13, 
        image: '/images/builder-1.jpg' 
      },
        { id: 2, 
        name: 'Omaxe Infratech', 
        totalProjects: 20, 
        projectsInCity: 13, 
        image: '/images/builder-2.png'
       },
        { id: 3, 
          name: 'Omaxe Infratech', 
          totalProjects: 30, 
          projectsInCity: 13, 
          image: '/images/builder-3.jpg'
         },
         { id: 4, 
          name: 'Omaxe Infratech', 
          totalProjects: 40, 
          projectsInCity: 13, 
          image: '/images/builder-4.jpg'
         },
         { id: 5, 
          name: 'Omaxe Infratech', 
          totalProjects: 110, 
          projectsInCity: 13, 
          image: '/images/builder-5.jpg'
         },
         { id: 6, 
          name: 'Omaxe Infratech', 
          totalProjects: 110, 
          projectsInCity: 13, 
          image: '/images/builder-6.jpg'
         },
       
      ];
  return (
<>

<div className="px-5 md:px-16 xl:px-32  mt-12 overflow-hidden">
      <div className="content">
        <h2 className="text-2xl font-bold text-gray-800 text-start">Popular builders</h2>
        <p className="text-xl font-bold text-gray-500 text-start">in Chandigarh</p>
      </div>


      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
  {cardsData.map((card, index) => (
    <div
      key={index}
      className="flex w-full items-center rounded-xl border border-gray-200 shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-[80px] h-[80px] flex-shrink-0 border border-gray-200 flex items-center justify-center rounded-full">
        <Image
          src={card.image}
          width={100}
          height={100}
          alt={`${card.name} logo`}
          className="w-[75%] h-[75%] object-contain"
        />
      </div>
      <div className="ml-4 flex-1">
        <h3 className="text-gray-900 font-medium text-lg md:text-xl leading-snug">
          {card.name}
        </h3>
        <p className="text-gray-600 text-sm md:text-base mt-1">
          {card.totalProjects} Total Projects | {card.projectsInCity} in this city
        </p>
      </div>
    </div>
  ))}
</div>



</div>

</>
  )
}
