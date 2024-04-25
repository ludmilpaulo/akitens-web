"use client";
import React, {  } from "react";
import CategoryCompnent from "@/components/CategoryCompnent";
import { Category, useCategoriesData, useHeaderData } from "@/configs/variable";

function ShopsCategories() {
  const categories  = useCategoriesData();

  const headerData = useHeaderData();

 

  return (
    <main className="flex-1" style={{ backgroundImage: `url(${headerData?.backgroundApp})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
    
      <div className="grid grid-cols-1 grid-flow-row-dense md:grid-cols-4 gap-6 m-6">
        {categories?.map((category : Category) => (
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