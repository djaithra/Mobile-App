import * as React from "react";
import { Link } from "expo-router";
import { ShoppingBag } from "lucide-react-native";
import useCart from "@/store/cartstore";
import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function CartBadge() {
  const totalCount = useCart((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  if (totalCount === 0) return null;
  return (
    <Link
      href="/cart"
      style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
      className="flex-row align-middle"
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
      </View>
    </Link>
  );
}
