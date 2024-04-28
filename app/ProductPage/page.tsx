"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import {
  Product,
  selectCartItems,
  updateBasket,
} from "@/redux/slices/basketSlice";
import withAuth from "@/components/ProtectedPage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import AddToCart from "@/components/AddToCart";
import HeaderTopArea from "@/components/HeaderTopArea";
import { useDispatch, useSelector } from "react-redux";
import RemoveFromCart from "@/components/RemoveFromCart";
import { Button } from "@/components/ui/button";
import { useHeaderData } from "@/configs/variable";

const ProductPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId") || "";
  const productTitle = searchParams.get("productTitle") || "";
  const productImage = searchParams.getAll("productImage") || [];
  const productPrice = searchParams.get("productPrice") || "";
  const productDescription = searchParams.get("productDescription") || "";
  const productRatings = searchParams.get("productRatings") || "";
  const shopId = searchParams.get("shopId") || "";
  const shopName = searchParams.get("shopName") || "";
  const shopImage_url = searchParams.get("shopImage_url") || "";
  const producCategory = searchParams.get("producCategory") || "";

  const parsedProductId =
    typeof productId === "string" ? parseInt(productId, 10) : NaN;

  // Type guards to ensure the correct types for other properties
  const title = typeof productTitle === "string" ? productTitle : "";
  const description =
    typeof productDescription === "string" ? productDescription : "";
  const price =
    typeof productPrice === "string" ? parseFloat(productPrice) : NaN;
  const ratings =
    typeof productRatings === "string" ? parseFloat(productRatings) : NaN;

  const category = typeof producCategory === "string" ? producCategory : "";

  const headerData = useHeaderData();

  console.log("Shop Name:", shopName);
  console.log("Shop Image URL:", shopImage_url);

  const productDetails: Product = {
    shop: 0, // Provide a default value or handle this according to your logic
    shopId: typeof shopId === "string" ? Number(shopId) : NaN,
    shopName: typeof shopName === "string" ? shopName : "",
    shopImage_url: typeof shopImage_url === "string" ? shopImage_url : "",
    id: parsedProductId,
    title,
    price,
    category,
    images: Array.isArray(productImage)
      ? productImage
      : typeof productImage === "string"
        ? [productImage]
        : [],
    image_urls: Array.isArray(productImage)
      ? productImage.join(",")
      : typeof productImage === "string"
        ? productImage
        : "",
    rating: ratings,
    description,
    quantity: 1,
  };

  const howManyInCart = cart
    .filter((item) => item.id === productDetails.id)
    .reduce((total, item) => total + item.quantity, 0);

  const handleAdd = () => {
    dispatch(updateBasket(productDetails));
  };

  console.log("product all details", productDetails);

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
      <div className="p-4 lg:p-10 flex flex-col lg:flex-row w-full">
        <div className="hidden lg:inline space-y-4">
          {Array.isArray(productImage) &&
            productImage.map((image, i) => (
              <Image
                key={image}
                src={image}
                alt={title + " " + i}
                width={90}
                height={90}
                className="border rounded-sm"
              />
            ))}
        </div>
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-3/5 mb-10 lg:mb-0 lg:w-full self-start flex items-center max-w-xl mx-auto lg:mx-20"
        >
          <CarouselContent>
            {Array.isArray(productImage) &&
              productImage.map((image, i) => (
                <CarouselItem key={i}>
                  <div className="p-1">
                    <div className="flex aspect-square items-center justify-center p-2 relative">
                      <Image
                        key={image}
                        src={image}
                        alt={title + " " + i}
                        width={400}
                        height={400}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex-1 border bg-white rounded-md w-full p-5 space-y-5">
          <h1 className="text-3xl font-bold">{title}</h1>

          <p className="py-5"> {description}</p>

          <p className="text-yellow-500 text-sm">
            {ratings} ★<span className="text-gray-400 ml-2">{ratings}</span>
          </p>

          <p className="text-2xl font-bold mt-2">{price} Kz</p>

          {/* Pass productDetails object as prop to AddToCart component */}

          {howManyInCart > 0 ? (
            <div className="flex space-x-5 items-center">
              <RemoveFromCart product={productDetails} />
              <span>{howManyInCart}</span>
              <Button
                className="bg-green-500 hover:bg-walmart/50"
                onClick={handleAdd}
              >
                +
              </Button>
            </div>
          ) : (
            <Button
              className="bg-green-500 hover:bg-black/50"
              onClick={handleAdd}
            >
              Add to Cart
            </Button>
          )}

          <hr />

          <h3 className="font-bold text-xl pt-10">Especificações</h3>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Especificação</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Render specifications here */}
              <TableRow>
                <TableCell className="font-bold">{description}</TableCell>
                <TableCell>{price}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </main>
  );
};

export default withAuth(ProductPage);
