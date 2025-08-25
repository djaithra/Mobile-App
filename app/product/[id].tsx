import * as React from "react";
import { useLocalSearchParams } from "expo-router";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ActivityIndicator, Image, useWindowDimensions } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import INRDisplay from "@/components/INRDisplay";
import { Stack } from "expo-router";
import { getProductById } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
import useCart from "@/store/cartstore";
import { useAddToCart } from "@/hooks/useAddToCart";

import ZoomableImage from "@/components/ZoomableImage";

export default function ProductDetailsScreen() {
  const window = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const cartItems = useCart((state) => state.items);
  const addToCart = useAddToCart();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(Number(id)),
  });

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (error || !product) {
    return <Text>Error: Fetching Product</Text>;
  }

  return (
    <Card className="flex-1 m-1 p-5 rounded-lg overflow-hidden">
      <Stack.Screen
        options={{ title: product.name, headerTitleAlign: "center" }}
      />
      <Box style={{ flex: 1, flexDirection: "column" }}>
        {/* Product Image */}
        <Box
          style={{
            height: 360,
            width: window.width,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <ZoomableImage
            uri={product.image}
            height={360}
            width={window.width}
          />
        </Box>
        <Box style={{ flex: 1, justifyContent: "flex-end" }}>
          <Text className="text-sm font-normal mb-2 text-typography-700">
            Electronics Items
          </Text>
          <VStack className="mb-6">
            <Heading size="md" className="mb-4">
              {product.name}
            </Heading>
            <Text size="sm">{product.description}</Text>
          </VStack>
          <VStack className="mb-2">
            <Text className="text-sm font-bold mb-2 text-typography-700">
              <INRDisplay amount={product.price} />
            </Text>
          </VStack>
          <Box className="flex-col sm:flex-row">
            <Button
              onPress={() => addToCart(product)}
              className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
              style={{ backgroundColor: "#D4AF37" }}
            >
              <ButtonText size="sm">Add to cart</ButtonText>
            </Button>
            <Button
              variant="outline"
              className="px-4 py-2 border-outline-300 sm:flex-1"
            >
              <ButtonText size="sm" className="text-typography-600">
                Wishlist
              </ButtonText>
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
