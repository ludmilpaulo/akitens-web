// pages/404.js

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";

import { motion } from "framer-motion";
import logo from "../assets/AquiBg.png";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    alert(" Redirect to LoginScreenUser after 3 seconds ");
    const timer = setTimeout(() => {
      router.push("/LoginScreenUser");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <>
        <div className="w-full min-h-screen px-4 py-16 flex items-center justify-center">
          <div className="relative flex flex-col items-center justify-center w-full max-w-lg bg-white rounded shadow-lg">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FCB61A] to-[#0171CE] rounded-lg blur-lg opacity-50 -z-20" />

            {/* Logo */}
            <div className="flex justify-center mb-6">
              {/* Image component here */}
              {/* Assuming you've imported your logo as `logo` */}
              <Image
                src={logo} // Update the path based on your project structure
                alt="logo"
                width={100}
                height={100}
                className="w-64 h-64"
              />
            </div>

            {/* Login form */}
            <motion.div
              animate={{
                scale: [1, 1, 1, 1, 1],
                rotate: [0, 30, 60, 240, 360],
              }}
              className="w-full p-6 md:p-10 lg:p-12"
            >
              <p className="text-2xl font-extrabold leading-6 text-gray-800 mb-6">
                Faça login na sua conta
              </p>
            </motion.div>
          </div>
        </div>
        <Footer />
      </>
    </div>
  );
};

export default NotFoundPage;
