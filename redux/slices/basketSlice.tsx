// basketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";



export type Product = {
  shop : number;
  shopId: number;
  shopName: string;
  shopImage_url: string;
  category: string;
  id: number;
  title: string;
  price: number;
  images: (string | File)[];
  image_urls: string;
  rating: number;
  description: string;
  quantity: number;
};

interface BasketState {
  items: Product[];
}

const initialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    updateBasket: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);

      if (index >= 0) {
        // Update the quantity of the existing product immutably
        const updatedItems = [...state.items];
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity + 1,
        };
        state.items = updatedItems;
      } else {
        // Add the product to the basket with quantity 1
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromBasket: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const index = state.items.findIndex((item) => item.id === productId);

      if (index >= 0) {
        // Decrease the quantity until it's 1, then remove the item
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    removeOrderedItems: (state, action: PayloadAction<number[]>) => {
      // Remove items from cart that were successfully ordered
      const orderedProductIds = action.payload;
      state.items = state.items.filter(
        (item) => !orderedProductIds.includes(item.id),
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { updateBasket, removeFromBasket, clearCart, removeOrderedItems } =
  basketSlice.actions;
export const selectCartItems = (state: RootState) => state.basket.items;

export default basketSlice.reducer;