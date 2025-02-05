'use client'

import { useState } from 'react';

export default function Nowme() {

   const [paused, setPaused] = useState(false);

  return (
   <>

<div className="w-full h-[500px] bg-blue-300 overflow-hidden relative">
  {/* Marquee container with mirrored content */}
  <div className="absolute inset-0 flex">
    {/* Primary marquee */}
    <div className="flex animate-marquee items-center space-x-8 whitespace-nowrap">
      {[1, 2, 3, 4, 5].map((item) => (
        <img
          key={item}
          src={`https://picsum.photos/200/300?random=${item}`}
          alt={`Placeholder ${item}`}
          className="h-48 w-48 object-cover flex-shrink-0 rounded-lg"
        />
      ))}
    </div>
    
    {/* Mirrored duplicate for seamless loop */}
    <div className="flex animate-marquee items-center space-x-8 whitespace-nowrap">
      {[1, 2, 3, 4, 5].map((item) => (
        <img
          key={item + "copy"}
          src={`https://picsum.photos/200/300?random=${item}`}
          alt={`Placeholder ${item}`}
          className="h-48 w-48 object-cover flex-shrink-0 rounded-lg"
        />
      ))}
    </div>
  </div> 
</div>
   </>
  )
}
