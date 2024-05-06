import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import AddToCart from './AddToCart';
import { Button } from './ui/button';
import { RootState } from '@/redux/store';
import { Product } from '@/redux/slices/basketSlice';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

function Basket() {
  const cart = useSelector((state: RootState) => state.basket.items);
  const [loading, setLoading] = useState(false);

  const groupedCart = useMemo(() => {
    const groups: { [key: string]: Product[] } = {};
    cart.forEach((item) => {
      const key = `${item.shopName}_${item.shopId}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
    });
    return groups;
  }, [cart]);

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <>
      <Transition
        show={loading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {loading && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </Transition>
      <div className="max-w-7xl mx-auto grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Object.entries(groupedCart).map(([groupKey, items]) => (
          <div
            key={groupKey}
            className="bg-white border rounded-lg overflow-hidden shadow-md"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {items[0].shopName}
              </h2>
              <div className="w-full h-24 relative mb-4">
                <Image
                  src={items[0].shopImage_url || '/fallback.png'}
                  alt={`${items[0].shopName} logo`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <p>Total Products: {items.length}</p>
              <ul className="space-y-5">
                {items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.quantity} x {item.price} Kz</p>
                    </div>
                    <AddToCart product={item} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-gray-100 border-t">
              <Link
                href={{
                  pathname: "/CheckoutScreen",
                  query: { cart: encodeURIComponent(JSON.stringify(items)) },
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
    </>
  );
}

export default Basket;
