"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { basAPI, useHeaderData } from "@/configs/variable";

import  Footer  from "@/components/Footer";
import { Eye, EyeOff } from "lucide-react";

import ForgotPassword from "./ForgotPassword";


type Inputs = {
  username: string;
  password: string;
};

type Props = {};

const LoginScreenUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPasswordDialog, setShowForgotPasswordDialog] =
    useState(false); // State to manage the visibility of the forgot password dialog

    const headerData = useHeaderData();

  if (!headerData) {
    //setLoading(true)
    return <div>   <Transition
    show={loading}
    enter="transition-opacity duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity duration-300"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
   {loading && (
<div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
<div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
</div>
)}

  </Transition></div>;
  }

    const toggleForgotPasswordDialog = () => {
      setShowForgotPasswordDialog(!showForgotPasswordDialog);
    };
    

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  let handleSubmit = async () => {
    try {
      let res = await fetch(`${basAPI}/accounts/login/`, {
        method: "POST",
        // mode: 'no-cors',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      let resJson = await res.json();
      console.log("recebido", resJson);

      if (res.status === 200 && resJson.is_customer === true) {
        dispatch(loginUser(resJson));
        alert(
          "Você se conectou com sucesso Agora você pode saborear sua refeição",
        );
        router.push("/");
      } else if (resJson.is_customer === false) {
        dispatch(loginUser(resJson));
        router.push("/ShopDashboard"); // Redirect to Dashboard
        // alert(Object.values(resJson));
      } else {
        alert(Object.values(resJson));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
  
  
    <div className="w-full min-h-screen px-4 py-16 flex items-center justify-center" style={{ backgroundImage: `url(${headerData?.backgroundApp})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg bg-white rounded shadow-lg">
        {/* Background gradient */}
        <div className="absolute inset-0 rounded-lg blur-lg opacity-50 -z-20" />
  
        {/* Logo */}
        <div className="flex justify-center mb-6">
          {/* Image component here */}
          {/* Assuming you've imported your logo as `logo` */}
          <Image
                src={headerData.logo} // Update the path based on your project structure
                alt="logo"
                width={100}
                height={100}
                className="w-64 h-64"
              />
        </div>
        {showForgotPasswordDialog && <ForgotPassword />}
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
  
          {/* Sign up link */}
          <Link href={"/SignupScreen"}>
            <p className="text-sm font-medium leading-none text-gray-500 mb-4">
              Não tem uma conta?{" "}
              <span
                tabIndex={0}
                role="link"
                aria-label="Sign up here"
                className="text-sm font-medium leading-none text-[#007bff] underline cursor-pointer"
              >
                {" "}
                Assine aqui
              </span>
            </p>
          </Link>
  
          {/* Username input */}
          <div>
            <input
              placeholder="Nome do Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full py-3 pl-3 text-xs font-medium leading-none text-black bg-gray-200 border rounded focus:outline-none"
            />
          </div>
  
          {/* Password input */}
          <div className="relative mt-6">
            <input
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="w-full py-3 pl-3 text-xs font-medium leading-none text-black bg-gray-200 border rounded focus:outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center justify-center h-full px-3"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
  
          {/* Login button */}
          <div className="mt-8">
            <button
              onClick={handleSubmit}
              role="button"
              type="submit"
              aria-label="entrar na minha conta"
              className="w-full py-4 text-sm font-semibold leading-none text-white bg-[#007bff] border rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none hover:bg-indigo-600"
            >
              Entrar na Minha Conta
            </button>
          </div>
  
          {/* Forgot password link */}
          <div className="mt-4">
            <button
              onClick={toggleForgotPasswordDialog}
              className="text-sm text-blue-500 font-medium hover:underline focus:outline-none"
            >
              Esqueceu a senha?
            </button>
          </div>
        </motion.div>
      </div>
    </div>

  </>
  
  );
};

export default LoginScreenUser;