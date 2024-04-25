import React, { useCallback, useEffect, useState } from "react";
import ProductTableRow from "./ProductTableRow";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/authSlice";
import { basAPI } from "@/configs/variable";
import { Product } from "@/redux/slices/basketSlice";

const ProductTableContainer = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);

  const fetchProductData = useCallback(async () => {
    setLoading(true);
    if (user?.token) {
      try {
        const response = await fetch(
          `${basAPI}/shops/get_products/?access_token=${user.token}`,
        );
        if (response.ok) {
          const data = await response.json();
          console.log("produtos==>", data);
          if (data && Array.isArray(data.products)) {
            setProducts(data.products);
          } else if (data && data.length === 0) {
            alert("No products available. Please add products.");
          }
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [user]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchProductData();
    }, 9000); // 5000 milliseconds = 5 seconds

    // Clear the interval when the component unmounts or when fetchProductData changes
    return () => clearInterval(intervalId);
  }, [fetchProductData]);

  const handleDelete = async (productId: number) => {
    const user_id = user?.user_id;

    if (!user_id) {
      alert("User ID not provided.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `${basAPI}/shops/delete-product/${productId}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user_id }),
          },
        );

        if (response.ok) {
          alert("Product deleted successfully!");
          setProducts((prevProducts) => {
            if (prevProducts) {
              return prevProducts.filter((product) => product.id !== productId);
            } else {
              return null;
            }
          });
        } else {
          alert("Failed to delete product. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert(
          "An error occurred while trying to delete the product. Please try again.",
        );
      }
    }
  };

  return (
    <div className="table-responsive">
      {loading && <p>Loading...</p>}
      {products && (
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2 border">No</th>
              <th className="px-4 py-2 border">Nome</th>
              <th className="px-4 py-2 border">Pequena descrição</th>
              <th className="px-4 py-2 border">Preço</th>
              <th className="px-4 py-2 border">Imagem</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <ProductTableRow
                key={index}
                product={product}
                index={index}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductTableContainer;