import * as React from "react";
import { Link } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import useCart from "@/store/cartstore";
import { Text } from "@/components/ui/text";

export function CartBadge() {
  const totalCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  if (totalCount === 0) return null;
  return (
    <Link href="/cart" className="flex-row gap-2 align-middle">
      <ShoppingBag />
      <Text>{totalCount}</Text>
    </Link>
  );
}
