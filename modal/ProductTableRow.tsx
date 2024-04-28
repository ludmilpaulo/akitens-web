import React from "react";
import Link from "next/link";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { Product } from "@/redux/slices/basketSlice";

interface ProductTableRowProps {
  product: Product;
  index: number;
  handleDelete: (productId: number) => void;
}

const ProductTableRow: React.FC<ProductTableRowProps> = ({
  product,
  index,
  handleDelete,
}) => {
  return (
    <tr className="table-info">
      <td className="px-4 py-2 border">{product.id}</td>
      <td className="px-4 py-2 text-black border">
        <Link href={`/restaurant/edit-product/${product.id}`}>
          <p className="text-black">{product.title}</p>
        </Link>
      </td>
      <td className="px-4 py-2 border">{product.description}</td>
      <td className="px-4 py-2 border">{product.price} Kz</td>
      <td className="px-4 py-2 border">
        <div className="relative h-16 w-16">
          {product.image_urls && product.image_urls.length > 0 ? (
            <Image
              className="object-cover rounded-full"
              src={product.image_urls[0]}
              layout="fill"
              alt={product.title}
            />
          ) : (
            <Image
              className="object-cover rounded-full"
              src="/path/to/default/image.png"
              layout="fill"
              alt={product.title}
            />
          )}
        </div>
      </td>
      <td className="flex justify-around px-4 py-2 border">
        <button className="text-blue-600 hover:text-blue-800 focus:outline-none">
          <FaEdit />
        </button>
        <button
          className="text-red-600 hover:text-red-800 focus:outline-none"
          onClick={() => handleDelete(product.id)}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ProductTableRow;
