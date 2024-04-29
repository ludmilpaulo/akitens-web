"use client";
import React, { useEffect, useState } from "react";
import CategoryCompnent from "@/components/CategoryCompnent";
import { Category, basAPI } from "@/configs/variable";

function ShopsCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${basAPI}/shops/shop-categories/`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <main className="flex-1">
    
      <div className="grid grid-cols-1 grid-flow-row-dense md:grid-cols-4 gap-6 m-6">
        {categories.map((category) => (
          <CategoryCompnent
            key={category.id}
            category={category}
            // Assuming you have a placeholder image for each category
            // image={category.image}
            // className="bg-blue-100 h-full md:h-32"
          />
        ))}
      </div>
     
    </main>
  );
}

export default ShopsCategories;