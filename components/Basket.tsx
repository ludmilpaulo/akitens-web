import { useSelector } from "react-redux";
import Image from "next/image";
import AddToCart from "./AddToCart";
import RemoveFromCart from "./RemoveFromCart";
import { Button } from "./ui/button";
import { RootState } from "@/redux/store";
import { Product } from "@/redux/slices/basketSlice";
import Link from "next/link";

function Basket() {
  const cart = useSelector((state: RootState) => state.basket.items);

  // Grouping products by shopName and shopId
  const groupedCart: { [key: string]: Product[] } = {};
  cart.forEach((item) => {
    const key = `${item.shopName}_${item.shopId}`;
    if (!groupedCart[key]) {
      groupedCart[key] = [];
    }
    groupedCart[key].push(item);
  });

  // Check if cart is empty
  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(groupedCart).map(([groupKey, items]) => (
        <div
          key={groupKey}
          className="bg-white border rounded-lg overflow-hidden shadow-md"
        >
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              {items.length > 0 && items[0].shopName}
            </h2>
            <ul className="space-y-5">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    {Array.isArray(item.image_urls) &&
                      item.image_urls.length > 0 && (
                        <div className="w-16 h-16 relative">
                          <Image
                            src={
                              typeof item.image_urls[0] === "string"
                                ? item.image_urls[0]
                                : JSON.stringify(item.image_urls[0])
                            }
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                          />
                        </div>
                      )}
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      {/* Uncomment below line if you want to show the description */}
                      {/* <p className="text-sm text-gray-500">{item.description}</p> */}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <AddToCart product={item} />
                    <p className="font-semibold ml-2">{item.quantity}</p>
                    <p className="font-semibold ml-2">
                      {item.quantity * item.price} Kz
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-gray-100 border-t">
            <Link
              href={{
                pathname: "/CheckoutScreen",
                query: { cart: JSON.stringify(items) },
              }}
            >
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Basket;
