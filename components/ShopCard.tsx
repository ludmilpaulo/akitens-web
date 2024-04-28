import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

export default function ShopCard({ shopData }: ShopCardProps) {
  const router = useRouter(); // Get the router object from Next.js

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 py-4 px-4 mb-12">
      {shopData.map((shop: Shop) => (
        <div
          key={shop.id}
          className="relative flex bg-white flex-col shadow-lg bg-opacity-60 backdrop-filter backdrop-blur-lg rounded-xl"
        >
          <Image
            className="w-full h-full mb-4 self-center"
            width={300}
            height={300}
            src={shop.logo_url}
            alt={shop.name}
          />
          <div className="flex flex-col items-center flex-grow">
            <div className="text-xl font-medium text-black">{shop.name}</div>
            <p className="text-gray-500">{shop.address}</p>
          </div>
          <Link
            href={{
              pathname: "/ProductList",
              query: {
                shopName: shop.name,
                shopId: shop.id, // Pass the shopId as a query parameter
                phone: shop.phone,
                shopImage_url: shop.logo_url,
                address: shop.address,
              },
            }}
          >
            <button
              onClick={() => router.push(`/ProductList?shopId=${shop.id}`)} // Programmatically navigate to ProductList with shopId
              className="mt-auto w-full bg-black hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
            >
              Ver produtos de {shop.name}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
