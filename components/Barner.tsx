import { useEffect, useState } from "react";
import Image from "next/image";

type ShopCardProps = {
  shopData: Shop[];
};

type Shop = {
  id: number;
  name: string;
  phone: string;
  address: string;
  logo_url: string;
};

const Banner = ({ shopData }: ShopCardProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Fetch image URLs from shopData and update images state
    const imageUrls = shopData.map((item) => item.logo_url);
    setImages(imageUrls);
  }, [shopData]);

  useEffect(() => {
    // Function to change current slide
    const changeSlide = () => {
      setCurrentSlide((prevSlide) =>
        prevSlide === images.length - 1 ? 0 : prevSlide + 1,
      );
    };

    // Interval to change slide every 6 seconds
    const slideInterval = setInterval(changeSlide, 6000);

    // Clean up interval on component unmount
    return () => clearInterval(slideInterval);
  }, [images]);

  return (
    <div className="relative">
      {images.length > 0 && (
        <Image
          src={images[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          className="object-cover w-full h-[400px]"
          width={300}
          height={300}
          unoptimized={true} // To bypass domain check for external images
        />
      )}
    </div>
  );
};

export default Banner;