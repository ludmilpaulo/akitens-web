"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { basAPI, useHeaderData } from "@/configs/variable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import withAuth from "@/components/ProtectedPage";
import RemoveFromCart from "@/components/RemoveFromCart";
import {
  Product,
  selectCartItems,
  updateBasket,
} from "@/redux/slices/basketSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);

  const searchParams = useSearchParams();
  const shopId = searchParams.get("shopId") || "";
  const shopName = searchParams.get("shopName") || "";
  const shopImage_url = searchParams.get("shopImage_url") || "";

  const headerData = useHeaderData();

  const howManyInCart = (product: Product) =>
    cart
      .filter((item) => item.id === product.id)
      .reduce((total, item) => total + item.quantity, 0);

  const handleAdd = (product: Product) => {
    const {
      id,
      title,
      price,
      description,
      rating,
      category,
      image_urls,
      quantity,
    } = product;
    const productWithShopInfo: Product = {
      id,
      title,
      price,
      description,
      rating,
      category,
      image_urls,
      shop: parseInt(shopId), // Assuming shop is of type number
      shopId: parseInt(shopId),
      shopName,
      shopImage_url,
      images: [], // Assuming images is of type string | File[]
      quantity, // Assuming quantity is available in the product object
    };
    dispatch(updateBasket(productWithShopInfo));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (shopId) {
          const response = await fetch(
            `${basAPI}/shops/get-products-by-shops/?shop_id=${shopId}`,
          );
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [shopId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (products.length > 0) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === products[currentImageIndex]?.image_urls.length - 1
            ? 0
            : prevIndex + 1,
        );
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [currentImageIndex, products]);

  return (
    <main
      className="flex-1"
      style={{
        backgroundImage: `url(${headerData?.backgroundApp})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="mx-auto container px-6 xl:px-0 py-12">
        <div className="flex flex-col">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="w-full bg-white">
                <div className="h-80 relative">
                  <Image
                    src={product.image_urls[currentImageIndex]}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium">{product.title}</p>
                    <p className="font-medium">{product.price} Kz</p>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {product.description.length > 50
                      ? `${product.description.substring(0, 50)}...`
                      : product.description}
                  </p>
                </div>
                <div className="p-4">
                  {howManyInCart(product) > 0 ? (
                    <div className="flex space-x-5 items-center">
                      <RemoveFromCart product={product} />
                      <span>{howManyInCart(product)}</span>
                      <Button
                        className="bg-green-500"
                        onClick={() => handleAdd(product)}
                      >
                        +
                      </Button>
                    </div>
                  ) : (
                    <button
                      className="bg-green-500 hover:bg-black/50"
                      onClick={() => handleAdd(product)}
                    >
                      Adicionar ao Carrinho
                    </button>
                  )}
                </div>
                <br />
                <Link
                  href={{
                    pathname: "/ProductPage",
                    query: {
                      shopId,
                      shopName,
                      shopImage_url,
                      productId: product.id,
                      productImage: product.image_urls,
                      productPrice: product.price,
                      productTitle: product.title,
                      productDescription: product.description,
                      productRatings: product.rating,
                      producCategory: product.category,
                    },
                  }}
                  className="mt-6 text-blue-500 hover:text-blue-700"
                >
                  Ver o Produto
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default withAuth(ProductList);
