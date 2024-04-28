"use client";
import Barner from "@/components/Barner";
import React, { Suspense, useEffect, useState } from "react";
import ShopCard from "@/components/ShopCard";
import { Category, Shop, basAPI, useHeaderData } from "@/configs/variable";
import { useRouter, useSearchParams } from "next/navigation";

import withAuth from "@/components/ProtectedPage";

function ShopList() {
  const searchParams = useSearchParams();
  const category_id = searchParams.get("category_id") || "";

  const [category, setCategory] = useState<Category | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);

  const headerData = useHeaderData();

  useEffect(() => {
    // Check if category_id is available in the router query
    if (category_id) {
      // Parse category_id to integer
      const categoryId = parseInt(category_id as string, 10);
      // Set the category state
      setCategory({ id: categoryId, name: "", image: "" });
    }
  }, [category_id]);

  useEffect(() => {
    // Fetch shops when category changes
    if (category && category.id) {
      fetchShopsByCategory(category.id);
    }
  }, [category]);

  const fetchShopsByCategory = async (categoryId: number) => {
    try {
      const response = await fetch(
        `${basAPI}/shops/get-shops-by-category/?category_id=${categoryId}`,
      );
      if (response.ok) {
        const data = await response.json();
        setShops(data);
        console.log("Shops", data);
      } else {
        console.error("Failed to fetch shops:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main
        className="flex-1"
        style={{
          backgroundImage: `url(${headerData?.backgroundApp})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-auto sm:h-custom">
          <Barner shopData={shops} />
        </div>
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <ShopCard shopData={shops} />
          </div>
        </div>
      </main>
    </Suspense>
  );
}

export default withAuth(ShopList);
