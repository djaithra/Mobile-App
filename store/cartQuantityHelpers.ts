// cartQuantityHelpers.ts
import useCart from "@/store/cartstore";
import { Item } from "@/store/cartstore";

export function incrementItemQuantity(item: Item) {
  const addItem = useCart.getState().addItem;
  addItem(item);
}

export function decrementItemQuantity(item: Item) {
  const removeItem = useCart.getState().removeItem;
  removeItem(item.id);
}

export function setItemQuantity(item: Item, quantity: number) {
  const addItem = useCart.getState().addItem;
  const removeItem = useCart.getState().removeItem;
  const cartItems = useCart.getState().items;
  const current = cartItems.find((i) => i.id === item.id)?.quantity || 0;
  if (quantity === 0) {
    removeItem(item.id);
  } else if (quantity > current) {
    for (let i = 0; i < quantity - current; i++) addItem(item);
  } else if (quantity < current) {
    for (let i = 0; i < current - quantity; i++) removeItem(item.id);
  }
}

export function getCartItemQuantity(itemId: number) {
  const cartItems = useCart.getState().items;
  return cartItems.find((i) => i.id === itemId)?.quantity || 0;
}
