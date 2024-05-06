"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Grid2X2,
  LayoutGrid,
  Heart,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectCartItems } from "@/redux/slices/basketSlice";
import { useRouter } from "next/navigation";
import BasketInterception from "@/modal/BasketInterception";
import useSearch from "@/modal/useSearch";
import Basket from "@/components/Basket";
import { X } from "lucide-react";

import ResultsModal from "@/modal/ResultsModal";
import { basAPI } from "@/configs/variable";

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

function HeaderTopArea() {
  const { searchTerm, searchResults, handleSubmit, handleChange } = useSearch();

  console.log("search results ", searchResults);

  const router = useRouter();
  const cart = useSelector(selectCartItems);
  const total = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isSearchResultsOpen, setIsSearchResultsOpen] = useState(false);

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

  const [isOpen, setIsOpen] = useState(true);

  function onDismiss() {
    setIsBasketOpen(false);
  }

  return (
    <>
      <header
        className="flex flex-col md:flex-row items-center px-10 py-7 space-x-5"
        style={{
          backgroundImage: `url(${headerData?.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div>
          <Link href="/" passHref>
            <Image
              src={headerData?.logo ?? "/default-logo.png"}
              alt="logo"
              width={150}
              height={150}
              className="mr-2 w-46 h-46"
            />
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center bg-white rounded-full w-full flex-1"
        >
          <input
            type="text"
            name="input"
            placeholder="Pesquise tudo..."
            className="flex-1 px-4 rounded-l-full outline-none placeholder:text-sm text-black"
            value={searchTerm}
            //onChange={handleInputChange} // Use handleInputChange instead of handleChange
            onChange={handleChange}
          />
          <button
            type="submit"
            onClick={() => {
              console.log("buttom clicked");
              setIsSearchResultsOpen(true); // Call setIsSearchResultsOpen as a function
            }}
          >
            <Search className="rounded-full h-10 px-2 w-10 bg-yellow-400 cursor-pointer" />
          </button>
        </form>

        <div className="flex space-x-5 mt-5 md:mt-0 font-extrabold text-2xl text-[#FFFFFF]">
          <Link href={"/ShopsCategories"} passHref>
            <div className="hidden xl:flex font-bold items-center space-x-2 text-sm">
              <Grid2X2 size={20} />
              <p>Lojas</p>
            </div>
          </Link>

          <Link href={"/ServicePage"} passHref>
            <div className="hidden xl:flex font-bold items-center space-x-2 text-sm">
              <LayoutGrid size={20} />
              <p>Serviços</p>
            </div>
          </Link>

          {user ? (
            <>
              <Link href={"/"} passHref>
                <div className="flex font-bold items-center space-x-2 text-sm">
                  <Heart size={20} />
                  <div>
                    <p>Meus itens</p>
                  </div>
                </div>
              </Link>
              <Link href={"/UserDashboard"} passHref>
                <div className="flex font-bold items-center space-x-2 text-sm">
                  <User size={20} />
                  <div>
                    <p>Conta</p>
                  </div>
                </div>
              </Link>
              <div
                onClick={() => {
                  router.push("/BasketPage")

                }}
                className="flex font-bold items-center space-x-2 text-sm cursor-pointer"
              >
                <ShoppingCart size={20} />
                <div>
                  <p className="text-xs font-extralight">
                    {cart.length > 0 ? `${cart.length} items` : "No items"}
                  </p>
                  <p>{cart.length > 0 ? `${total}` : "0"}</p>
                </div>
              </div>


            </>
          ) : (
            <Link href={"/LoginScreenUser"} passHref>
              <div className="flex text-white font-bold items-center space-x-2 text-sm">
                <User size={20} />
                <div>
                  <p>Entrar</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </header>
      <>
        {/* Conditionally render SearchResults */}
        {isSearchResultsOpen && (
          <ResultsModal
            products={searchResults}
            searchResults={searchResults}
          />
        )}
      </>
    </>
  );
}

export default HeaderTopArea;
