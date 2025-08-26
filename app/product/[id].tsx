import * as React from "react";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  ActivityIndicator,
  useWindowDimensions,
  ScrollView,
  Platform,
} from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import INRDisplay from "@/components/INRDisplay";
import { Stack, useLocalSearchParams } from "expo-router";
import { getProductById } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
import useCart from "@/store/cartstore";
import { useAddToCart } from "@/hooks/useAddToCart";
import ZoomableImage from "@/components/ZoomableImage";

export default function ProductPage() {
  const window = useWindowDimensions();
  const isWide = window.width > 700;
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
      <Box
        style={{
          flex: 1,
          flexDirection: isWide ? "row" : "column",
          position: "relative",
          minHeight: 0,
        }}
        pointerEvents="box-none"
      >
        {/* Product Image and Details Column */}
        <Box
          style={{
            flexDirection: isWide ? "row" : "column",
            flex: 1,
            minWidth: 0,
          }}
        >
          {/* Product Image */}
          <Box
            style={{
              height: isWide ? 400 : 360,
              width: isWide ? 400 : window.width,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: isWide ? 0 : 110,
              marginRight: isWide ? 32 : 0,
              flexShrink: 0,
            }}
          >
            <ZoomableImage
              uri={product.image}
              height={isWide ? 400 : 360}
              width={isWide ? 400 : window.width}
            />
          </Box>
          {/* Details Column */}
          {isWide ? (
            <Box
              style={{
                flex: 1,
                minWidth: 0,
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Box style={{ flexGrow: 1 }}>
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
              </Box>
              <Box
                style={{
                  flexDirection: "row",
                  gap: 16,
                  marginTop: 24,
                  width: "100%",
                }}
              >
                <Button
                  onPress={() => addToCart(product)}
                  style={{ backgroundColor: "#D4AF37", flex: 1 }}
                  accessibilityRole="button"
                >
                  <ButtonText size="sm">Add to cart</ButtonText>
                </Button>
                <Button
                  variant="outline"
                  style={{ flex: 1 }}
                  accessibilityRole="button"
                >
                  <ButtonText size="sm" className="text-typography-600">
                    Wishlist
                  </ButtonText>
                </Button>
              </Box>
            </Box>
          ) : (
            <Box
              style={{
                flex: 1,
                minWidth: 0,
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingBottom: 80,
              }}
            >
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
            </Box>
          )}
        </Box>
        {/* Fixed bottom buttons for mobile only, outside main Box for true overlay */}
        {!isWide && (
          <Box
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#fff",
              paddingVertical: 8,
              paddingHorizontal: 8,
              flexDirection: "row",
              gap: 12,
              zIndex: 9999,
              width: "100%",
              borderTopWidth: 1,
              borderColor: "#eee",
            }}
            pointerEvents="auto"
          >
            <Button
              onPress={() => addToCart(product)}
              className="bg-[#D4AF37] px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 flex-1 rounded-md"
              //style={{ backgroundColor: "#D4AF37", flex: 1, borderRadius: 8 }}
              accessibilityRole="button"
            >
              <ButtonText size="sm">Add to Cart</ButtonText>
            </Button>
            <Button
              variant="outline"
              className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 flex-1 rounded-md"
              //style={{ flex: 1, borderRadius: 8 }}
              accessibilityRole="button"
            >
              <ButtonText size="sm" className="text-typography-600">
                Wishlist
              </ButtonText>
            </Button>
          </Box>
        )}
      </Box>
    </Card>
  );
}
