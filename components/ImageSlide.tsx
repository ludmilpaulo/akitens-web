// components/ImageSlide.js
import { useState, useEffect } from 'react';
import Image from 'next/image';


const images = [
"https://www.sunshinedeliver.com/media/restaurant_logo/9Y1A2172.jpg", 
"https://www.sunshinedeliver.com/media/restaurant_logo/Logotipos_SD.png", 
"https://www.sunshinedeliver.com/media/restaurant_logo/images_1.jpeg", 
"https://www.sunshinedeliver.com/media/restaurant_logo/logo.jpeg",
  
  // Add more image URLs here
];

const ImageSlide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    }, 6000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative">
      <Image src={images[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="w-full h-64 object-cover" width={300} height={300} />
    </div>
  );
};

export default ImageSlide;
