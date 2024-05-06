"use client";
import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

import { useRouter, useSearchParams } from "next/navigation";
import withAuth from "@/components/ProtectedPage";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBasket,
  Product,
  selectCartItems,
  removeOrderedItems,
} from "@/redux/slices/basketSlice";
import { selectUser } from "@/redux/slices/authSlice";
import { basAPI } from "@/configs/variable";
import UserProfile from "@/components/UserProfile";

type CheckoutScreenProps = {
  cart: Product[];
};

const CheckoutScreen = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const cartQuery = searchParams.get("cart");
  const [cartData, setCartData] = useState<Product[]>([]);
  const dispatch = useDispatch();
  const itemsInCart = useSelector(selectCartItems);

  const user = useSelector(selectUser);
 
  const [paymentMethod, setPaymentMethod] = useState("eft");
 
  const [address, setAddress] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUserProfilePopup, setShowUserProfilePopup] = useState(false);

  useEffect(() => {
    if (useCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setAddress(`Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`);
            setLoading(false);
          },
          (error) => {
            console.error("Error obtaining location", error);
            setLoading(false);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    }
  }, [useCurrentLocation]);
  
  useEffect(() => {
    if (cartQuery) {
      const decodedCartQuery = decodeURIComponent(cartQuery);
      try {
        const parsedCartData = JSON.parse(decodedCartQuery);
        console.log("checkout", parsedCartData)
        setCartData(parsedCartData);
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    }
  
    // Fetch user profile data when component mounts
    fetchUserProfile();
  }, [user]);
  

  // Function to fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${basAPI}/accounts/customer/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user?.user_id, // Assuming user id is available in Redux store
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Check if avatar, phone, and address are null
        if (
          !data.customer_details.avatar ||
          !data.customer_details.phone ||
          !data.customer_details.address
        ) {
          setShowUserProfilePopup(true);
        }
      } else {
        console.error("Failed to fetch user profile:", data.error);
      }
    } catch (error) {
      console.error("Error occurred while fetching user profile:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const shopId = cartData.length > 0 ? cartData[0].shopId : null;

      const response = await fetch(`${basAPI}/orders/customer/add_order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_token: user?.token,
          address,
          shop_id: shopId,
          order_details: cartData.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order placed successfully:", data);
        // Extract IDs of successfully ordered items
        const orderedProductIds = cartData.map((item) => item.id);
        // Dispatch action to remove ordered items from the cart
        dispatch(removeOrderedItems(orderedProductIds));
        router.push("/SuccessScreen");
      } else {
        console.error("Failed to place order:", data.error);
      }
    } catch (error) {
      console.error("Error occurred while placing order:", error);
    }

    setLoading(false);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };
  
  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseCurrentLocation(false); // Uncheck the location checkbox when changing payment method
    setAddress(''); // Clear address field to avoid confusion
  };
  
  // For checkbox, specifically if you need to handle boolean checked property
  

  return (
    <div className="relative mx-auto w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          </div>
        )}
      </Transition>
      {showUserProfilePopup && <UserProfile />}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order details */}
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-2">Order Details</h3>
          <ul>
            {cartData.map((item) => (
              <li key={item.id} className="py-2 border-b last:border-b-0">
                <p className="text-gray-700">{item.title} - {item.quantity} x ${item.price}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Address form */}
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-2">Delivery Address</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useCurrentLocation"
                checked={useCurrentLocation}
                onChange={(e) => {
                  setUseCurrentLocation(e.target.checked);
                  setLoading(true);
                }}
              />
              <label htmlFor="useCurrentLocation" className="text-gray-600">Use current location</label>
            </div>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Enter new address"
              disabled={useCurrentLocation}
              className="w-full p-2 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Confirm Address
            </button>
          </form>
        </div>

        {/* Payment options */}
        <div className="bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold border-b pb-2">Payment Options</h3>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="eft"
                  checked={paymentMethod === "eft"}
                  onChange={handlePaymentChange}
                />
                <span>EFT (Bank Transfer)</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="onDelivery"
                  checked={paymentMethod === "onDelivery"}
                  onChange={handlePaymentChange}
                />
                <span>Pay on Delivery</span>
              </label>
            </div>
            {paymentMethod === "eft" && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Please transfer the total amount to:</p>
                <p>Bank: XYZ Bank</p>
                <p>Account: 1234567890</p>
                <p>Send proof of payment to email@example.com or WhatsApp 1234567890</p>
              </div>
            )}
            {paymentMethod === "onDelivery" && (
              <div className="mt-2 text-sm text-gray-600">
                <p>Please have exact change or you can pay by card at delivery.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default withAuth(CheckoutScreen);