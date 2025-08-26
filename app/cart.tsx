import useCart from "@/store/cartstore";
import { FlatList } from "react-native";
import { Image, Platform } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Redirect } from "expo-router";

interface Product {
  id: number;
  quantity: number;
  [key: string]: any;
}

export default function CartScreen() {
  const cartItems = useCart((state) => state.items);
  const resetCart = useCart((state) => state.resetCart);

  const onCheckout = () => {
    // Handle checkout logic
    resetCart();
  };
  if (cartItems.length === 0) {
    return <Redirect href={"/"} />;
  }
  return (
    <Box style={{ flex: 1, backgroundColor: "#fff" }}>
      <Box style={{ flex: 1, paddingBottom: 88 }}>
        <FlatList
          contentContainerClassName="gap-2 w-full mx-auto"
          data={cartItems}
          keyExtractor={(item: Product) => item.id.toString()}
          renderItem={({ item }: { item: Product }) => (
            <HStack className="bg-white p-2 items-center">
              {item.image && (
                <Box
                  style={{
                    width: 56,
                    height: 56,
                    marginRight: 16,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={
                      Platform.OS === "web"
                        ? { uri: item.image }
                        : typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                    }
                    style={{ width: 52, height: 52, borderRadius: 8 }}
                    resizeMode="contain"
                    accessibilityLabel={item.name || "Product image"}
                  />
                </Box>
              )}
              <VStack style={{ flex: 1, minWidth: 0 }}>
                <Text bold numberOfLines={1} ellipsizeMode="tail">
                  {item.name}
                </Text>
                <Text>₹{item.price}</Text>
              </VStack>
              <Text className="ml-auto font-bold">{item.quantity}</Text>
            </HStack>
          )}
        />
      </Box>
      <Box
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: 8,
          borderTopWidth: 1,
          borderColor: "#eee",
          backgroundColor: "#fff",
          zIndex: 999,
        }}
      >
        <Text style={{ marginBottom: 8, fontWeight: "bold", fontSize: 16 }}>
          Total: ₹
          {cartItems
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </Text>
        <Button onPress={onCheckout} style={{ backgroundColor: "#D4AF37" }}>
          <ButtonText>Checkout</ButtonText>
        </Button>
      </Box>
    </Box>
  );
}
