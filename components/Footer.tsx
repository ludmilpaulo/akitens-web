"use client";
import React from 'react';
import Image from 'next/image';

import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa';
import { basAPI } from '@/configs/variable';

interface HeaderData {
  born_date: string;
  phone: string;
  address: string;
  whatsapp: string;
  facebook: string;
  twitter: string;
  instagram: string;
  logo: string;
  backgroundImage: string;
}

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

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
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <footer className="relative w-full" style={{ backgroundImage: `url(${headerData?.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="mx-auto w-full max-w-7xl px-8">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <div>
            {/* Using Next.js Image component for the logo */}
            <div className="mb-6">
              <Image src={headerData?.logo ?? '/default-logo.png'} alt="Material Tailwind Logo" width={200} height={50} />
            </div>
          </div>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <div className="mb-3 font-medium opacity-40 text-white">
                  {title}
                </div>
                {items.map((link) => (
                  <li key={link}>
                    <a href="#" className="py-1.5 font-normal transition-colors hover:text-blue-gray-900 text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between">
          <div className="mb-4 text-center font-normal text-white md:mb-0">
            &copy; {currentYear} <a href="https://material-tailwind.com/" className="text-white">Maindo</a>. All Rights Reserved.
          </div>
          <div className="flex gap-4 text-white sm:justify-center">
            <FaFacebookF className="opacity-80 transition-opacity hover:opacity-100" />
            <FaTwitter className="opacity-80 transition-opacity hover:opacity-100" />
            <FaInstagram className="opacity-80 transition-opacity hover:opacity-100" />
            <FaLinkedinIn className="opacity-80 transition-opacity hover:opacity-100" />
          </div>
        </div>
      </div>
    </footer>
  );
}
