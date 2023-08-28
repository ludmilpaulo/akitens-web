import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import HomePage from "./HomePage";
import { RootState } from "@/redux/types";
import { local } from "@/configs/variable";
import verifyUser from "@/configs/verifyUser";
import { logoutUser } from "@/redux/authReducer";

//const inter = Inter({ subsets: ["latin"] });

export default function Home() {

 
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user?.user_id && user?.token && typeof user?.username === 'string') {
    // Call the verifyUser function with user data
    verifyUser(user?.user_id, user?.token, user?.username)
      .then((verified) => {
        if (verified) {
          // User is verified, you can proceed with other actions
          console.log('User is verified');
        } else {
          // User verification failed, handle accordingly
          dispatch(logoutUser());
          console.log('User verification failed');
        }
      })
      .catch((error) => {
        // Handle any errors that may occur during verification
        console.error('Error verifying user:', error);
      });
    } else {
      // Handle the case where user or user data is missing or of the wrong type
    }
  }, [user]); // Call 

  return <HomePage />;
}
