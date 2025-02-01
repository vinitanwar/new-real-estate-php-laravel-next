import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid';

const images = [
  'images/slider-1.webp',
  'images/slider-1.webp',
  
  'images/slider-1.webp',
  
  // Add more image URLs
];

const Test = () => {
  const carouselRef = useRef(null);
  const tl = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ repeat: -1 })
        .to(carouselRef.current, {
          xPercent: -100 * (images.length - 1),
          ease: "none",
          duration: images.length * 2, // Adjust speed
        });
    }, carouselRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden">
      <div ref={carouselRef} className="flex">
        {images.map((image, index) => (
          <div key={index} className="min-w-full">
            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex justify-between items-center">
        <button className="bg-gray-800 p-2 rounded-full">
       
        </button>
        <button className="bg-gray-800 p-2 rounded-full">
          
        </button>
      </div>
    </div>
  );
};

export default Test;
