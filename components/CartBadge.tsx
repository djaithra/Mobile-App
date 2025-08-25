import * as React from "react";
import { useRouter } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import useCart from "@/store/cartstore";
import { Text } from "@/components/ui/text";

import { View, Pressable } from "react-native";

export function CartBadge() {
  const router = useRouter();
  const totalCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  if (totalCount === 0) return null;
  return (
    <Pressable
      onPress={() => router.push("/cart")}
      style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
      className="flex-row align-middle"
      accessibilityRole="button"
      accessibilityLabel="Go to cart"
      pointerEvents="auto"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <ShoppingBag color="#D4AF37" />
      <Text
        style={{
          color: "#D4AF37",
          fontWeight: "bold",
          fontSize: 10,
        }}
      >
        {totalCount}
      </Text>
    </Pressable>
  );
}
