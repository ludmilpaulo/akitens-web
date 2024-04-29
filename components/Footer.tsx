"use client";
import React from "react";
import Image from "next/image";

import Link from 'next/link';
import { SocialIcon } from "react-social-icons";
import { motion, useAnimation } from 'framer-motion';


import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { basAPI } from "@/configs/variable";

interface HeaderData {
  born_date: string;
  phone: string;
  address: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  logo: string;
  backgroundImage: string;
}



const currentYear = new Date().getFullYear();

export default function Footer() {
  const [headerData, setHeaderData] = React.useState<HeaderData | null>(null);

  React.useEffect(() => {
    fetch(`${basAPI}/info/aboutus/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("background", data);
        setHeaderData(data[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <footer
      className="relative w-full"
      style={{
        backgroundImage: `url(${headerData?.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <div>
            {/* Using Next.js Image component for the logo */}
            <div className="mb-6">
              <Image
                src={headerData?.logo ?? "/default-logo.png"}
                alt="Material Aki Tens"
                width={200}
                height={50}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-[#FFFFFF] justify-end">
  <ul className="mb-3 font-extrabold opacity-40 text-[#FFFFFF]">
    {/* Use Next.js Link component to handle navigation */}
    <li className="text-[#FFFFFF] font-extrabold">
      <Link href="/AboutUs">
        <span>Sobre nós</span>
      </Link>
    </li>
    <li className="text-[#FFFFFF] font-extrabold">
      <Link href="/Careers">
        <span>Carreiras</span>
      </Link>
    </li>
  </ul>
</div>


        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <div className="mb-4 text-center font-extrabold text-white md:mb-0">
            &copy; {currentYear}{" "}
            <a href="" className="text-white">
              Maindo
            </a>
            . All Rights Reserved.
          </div>
          <div className="flex gap-4 text-white sm:justify-center">
          <motion.div
  initial={{
    x: -500,
    opacity: 0,
    scale: 0.5,
  }}
  animate={{
    x: 0,
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: 2,
  }}
  className="flex flex-row items-center"
>
  <>
    {headerData?.facebook && <SocialIcon url={headerData.facebook} />}
    {headerData?.linkedin && <SocialIcon url={headerData.linkedin} />}
    {headerData?.twitter && <SocialIcon url={headerData.twitter} />}
   
    {headerData?.instagram && <SocialIcon url={headerData.instagram} />}
  </>
</motion.div>


          </div>
        </div>
      </div>
    </footer>
  );
}
