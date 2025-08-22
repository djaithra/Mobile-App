import * as React from "react";
import { useLocalSearchParams } from "expo-router";
//import products from "@/assets/products.json";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { ActivityIndicator, Image } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import INRDisplay from "@/components/INRDisplay";
import { Stack } from "expo-router";
import { getProductById } from "@/api/product";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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

  if (error) {
    return <Text>Error: Fetching Products</Text>;
  }

  // const product = products.find((p) => p.id === Number(id));
  // if (!product) {
  //   return <Text>Product not found</Text>;
  // }
  return (
    <Card className="flex-1 m-1 p-5 rounded-lg overflow-hidden">
      <Stack.Screen
        options={{ title: product.name, headerTitleAlign: "center" }}
      />
      <Image
        source={{ uri: product.image }}
        className="mb-6 h-[240px] w-full rounded-md"
        alt={`${product.name} image`}
        resizeMode="contain"
      />
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
        <Button className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1">
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
    </Card>
  );
}
