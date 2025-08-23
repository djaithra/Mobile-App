import useCart from "@/store/cartstore";

export function useAddToCart() {
  const addProduct = useCart((state) => state.addItem);
  return (item: any) => {
    if (item) {
      addProduct(item);
    }
  };
}
