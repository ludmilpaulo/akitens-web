import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { basAPI, Categoria } from "@/configs/variable";

import { useSelector } from "react-redux";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";
import { selectUser } from "@/redux/slices/authSlice";
import AddProductModal from "@/modal/AddProductModal";
import EditProductModal from "@/modal/EditProductModal";
import ProductTableRow from "@/modal/ProductTableRow";
import { SubmitHandler } from "react-hook-form";
import { Product } from "@/redux/slices/basketSlice";
import ProductTableContainer from "@/modal/ProductTableContainer";

// Define the TypeScript type for a product based on the response structure.

interface ProductsProps {
  products?: Product[];
}

const Products: React.FC<ProductsProps> = () => {
  const user = useSelector(selectUser);

  const [products, setProducts] = useState<Product[] | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productTable, setProductTable] = useState(true);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  console.log("products from backend ", products);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${basAPI}/shops/categorias/`);
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
          setLoading(false);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchCategorias();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const handleUpdate = async (
    productId: number,
    updatedProductData: Product,
  ) => {
    try {
      // Include the user_id in the updatedProductData object

      const response = await fetch(`${basAPI}/shops/update-product/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });
      console.log("update=>", response);

      if (response.ok) {
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert(
        "An error occurred while trying to update the product. Please try again.",
      );
    }
  };

  // Function to open the edit modal with the selected product
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  return (
    <>
      <div className="container px-4 mx-auto">
        <div className="content-wrapper">
          <div className="flex items-center justify-center page-header">
            <button
              onClick={() => {
                setIsAddModalOpen(true);
                setProductTable(false);
              }}
              className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Adicionar produto
            </button>
          </div>

          <Transition
            show={loading}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
              <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          </Transition>

          {!loading && (
            <>
              <AddProductModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                categorias={categorias}
                user={user}
              />

              <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSubmit={(data) => handleUpdate(editingProduct?.id || 0, data)}
                register={register}
                errors={errors}
                editingProduct={editingProduct}
                categorias={categorias}
              />

              {productTable && <ProductTableContainer />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
