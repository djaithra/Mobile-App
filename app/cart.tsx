import useCart from "@/store/cartstore";
import { FlatList } from "react-native";
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
    <FlatList
      contentContainerClassName="gap-2 w-full mx-auto"
      data={cartItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }: { item: Product }) => (
        <HStack className="bg-white p-2">
          <VStack>
            <Text bold>{item.name}</Text>
            <Text>{item.price}</Text>
          </VStack>
          <Text className="ml-auto">{item.quantity}</Text>
        </HStack>
      )}
      ListFooterComponent={() => (
        <Box>
          <Text>
            Total:{" "}
            {cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          </Text>
          <Button onPress={onCheckout}>
            <ButtonText>Checkout</ButtonText>
          </Button>
        </Box>
      )}
    />
  );
}
