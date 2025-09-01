import useCart from "@/store/cartstore";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  setItemQuantity,
} from "@/store/cartQuantityHelpers";
import { FlatList, Pressable } from "react-native";
import NumericInput from "@/components/ui/NumericInput";
import { Image, Platform } from "react-native";
import React from "react";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Redirect } from "expo-router";
import { createOrder } from "@/api/order";
import { useMutation } from "@tanstack/react-query";

interface Product {
  id: number;
  quantity: number;
  [key: string]: any;
}

export default function CartScreen() {
  // ...existing code...
  const cartItems = useCart((state) => state.items);
  const addItem = useCart((state) => state.addItem);
  const removeItem = useCart((state) => state.removeItem);
  const resetCart = useCart((state) => state.resetCart);

  const orderMutation = useMutation({
    mutationFn: (items: Product[]) =>
      createOrder(
        items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        }))
      ),
    onSuccess: () => {
      console.log("Order created successfully:", orderMutation.data);
      resetCart();
    },
    onError: (error) => {
      console.error("Error creating order:", error);
    },
  });

  const onCheckout = () => {
    // Handle checkout logic
    orderMutation.mutate(cartItems);
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
              <NumericInput
                value={item.quantity}
                min={0}
                onChange={(val) => setItemQuantity(item, val)}
                onIncrement={() => incrementItemQuantity(item)}
                onDecrement={() => decrementItemQuantity(item)}
                style={{ marginLeft: 12 }}
              />
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
        <Pressable>
          <Button
            onPress={onCheckout}
            className="bg-[#D4AF37] rounded-md"
            style={{ backgroundColor: "#D4AF37", borderRadius: 8 }}
          >
            <ButtonText>
              {`Proceed to Buy (${cartItems.reduce(
                (acc, item) => acc + item.quantity,
                0
              )} items)`}
            </ButtonText>
          </Button>
        </Pressable>
      </Box>
    </Box>
  );
}
