// AddToCart.tsx
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { updateBasket } from "@/redux/slices/basketSlice";
import { Product, selectCartItems } from "@/redux/slices/basketSlice";
import RemoveFromCart from "./RemoveFromCart";

function AddToCart({ product }: { product: Product }) {
  console.log("product for cart ", product);
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const howManyInCart = cart
    .filter((item) => item.id === product.id)
    .reduce((total, item) => total + item.quantity, 0);

  const handleAdd = () => {
    dispatch(updateBasket(product));
  };

  if (howManyInCart > 0) {
    return (
      <div className="flex space-x-5 items-center">
        <RemoveFromCart product={product} />
        <span>{howManyInCart}</span>
        <Button
          className="bg-green-500 hover:bg-walmart/50"
          onClick={handleAdd}
        >
          +
        </Button>
      </div>
    );
  }

  return (
    <Button className="bg-green-500 hover:bg-black/50" onClick={handleAdd}>
      Add to Cart
    </Button>
  );
}

export default AddToCart;
