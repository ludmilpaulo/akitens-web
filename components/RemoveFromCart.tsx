// RemoveFromCart.tsx
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { removeFromBasket } from "@/redux/slices/basketSlice"; // Adjusted import statement
import { Product, selectCartItems } from "@/redux/slices/basketSlice";

function RemoveFromCart({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const itemInCart = cart.find((item) => item.id === product.id);

  const handleRemove = () => {
    console.log("Removing from cart", product.id);
    if (itemInCart && itemInCart.quantity > 0) {
      dispatch(removeFromBasket(product.id)); // Dispatching action to remove item from cart
    }
  };

  return (
    <Button className="bg-red-500 hover:bg-black/50" onClick={handleRemove}>
      -
    </Button>
  );
}

export default RemoveFromCart;