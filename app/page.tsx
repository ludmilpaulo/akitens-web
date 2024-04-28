"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { selectUser } from "@/redux/slices/authSlice";
import { ThemeProvider } from "@material-tailwind/react";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const user = useSelector(selectUser);

  useEffect(() => {
    if (user !== null && typeof user === "object") {
      if (user.is_customer === true) {
        router.push("/ShopsCategories");
      } else if (user.fornecedor_id !== null) {
        router.push("/ShopDashboard");
      } else {
        router.push("/ShopsCategories");
      }
    } else {
      router.push("/ShopsCategories");
    }
  }, [router, user]);

  console.log("user==>>", user);

  return <></>;
}
