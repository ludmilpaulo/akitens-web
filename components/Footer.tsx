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
      className="relative w-full bg-gray-900"
      style={{
        backgroundImage: `url(${headerData?.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex items-center justify-center md:justify-start">
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
          
        </div>
        <div className="mt-12 flex flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
        <div className="grid grid-cols-2 gap-10 w-full items-center justify-between">
      <div>
        {/* Navigation links */}
        <ul className="flex gap-4">
          <li>
            <Link href="/AboutUs">
              <span className="text-white font-bold">Sobre nós</span>
            </Link>
          </li>
          <li>
            <Link href="/Careers">
              <span className="text-white font-bold">Carreiras</span>
            </Link>
          </li>
          <li>
            <Link href="/ContactPage">
              <span className="text-white font-bold">Contact Nos</span>
            </Link>
          </li>
        </ul>
      </div>
      <div>
        {/* Copyright text */}
        <Link href="/"><span className="text-white">Maindo  &copy; {currentYear}</span></Link>. <span className="text-white font-bold">All Rights Reserved.</span> 
      </div>
    </div>
          </div>
          <div className="flex gap-4 text-white justify-center md:justify-end">
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
        
    </footer>
  );
}
