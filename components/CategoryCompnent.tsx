import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Categoria } from "@/configs/variable";

type Props = {
  category: Categoria;
};

function CategoryComponent({ category }: Props) {
  return (
    <>
      {category && (
        <Link
          href={{
            pathname: "/ShopList",
            query: { category_id: category.id },
          }}
          className="grid-option relative"
        >
          <h2 className="text-xl font-bold">{category.name}</h2>
          {category.image && (
            <div className="relative h-40 w-50">
              <Image
                src={category?.image}
                alt={category.name}
                layout="fill"
                className="object-cover opacity-120 rounded-md"
              />
            </div>
          )}
        </Link>
      )}
    </>
  );
}

export default CategoryComponent;