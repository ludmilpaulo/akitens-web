"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
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

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUserProfilePopup, setShowUserProfilePopup] = useState(false);

  useEffect(() => {
    if (cartQuery) {
      setCartData(JSON.parse(cartQuery));
    }
    
    // Fetch user profile data when component mounts
    fetchUserProfile();
  }, [cartQuery]);

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
        if (!data.customer_details.avatar || !data.customer_details.phone || !data.customer_details.address) {
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

  return (
    <div className="relative mx-auto w-full bg-white">
      <div style={{ position: "relative" }}>
        {showUserProfilePopup && <UserProfile />}
      </div>
      {/* Checkout form and summary */}
    </div>
  );
};

export default withAuth(CheckoutScreen);