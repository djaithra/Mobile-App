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
import { Stack, useLocalSearchParams } from "expo-router";
import { getProductById } from "@/api/product";
import { ShoppingCart } from "lucide-react-native";
import { useQuery } from "@tanstack/react-query";
import useCart from "@/store/cartstore";
import {
  incrementItemQuantity,
  decrementItemQuantity,
  setItemQuantity,
} from "@/store/cartQuantityHelpers";
import { useAddToCart } from "@/hooks/useAddToCart";
import NumericInput from "@/components/ui/NumericInput";
import ZoomableImage from "@/components/ZoomableImage";

export default function ProductPage() {
  const window = useWindowDimensions();
  const isWide = window.width > 700;
  const { id } = useLocalSearchParams<{ id: string }>();
  const cartItems = useCart((state) => state.items);
  // reactive quantity so UI updates immediately
  const quantity = useCart(
    (state) => state.items.find((i) => i.id === Number(id))?.quantity || 0
  );
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
    <>
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
                      ₹{product.price}
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
                  {quantity === 0 ? (
                    <>
                      <Button
                        key="add-btn"
                        onPress={() => addToCart(product)}
                        style={{
                          backgroundColor: "#D4AF37",
                          flex: 1,
                          height: 32,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        accessibilityRole="button"
                      >
                        <ShoppingCart
                          size={16}
                          color="#fff"
                          style={{ marginRight: 6 }}
                        />
                        <ButtonText size="sm">Add to cart</ButtonText>
                      </Button>
                      <Button
                        key="wishlist-wide"
                        variant="outline"
                        style={{ flex: 1, height: 32 }}
                        accessibilityRole="button"
                      >
                        <ButtonText size="sm" className="text-typography-600">
                          Wishlist
                        </ButtonText>
                      </Button>
                    </>
                  ) : (
                    <>
                      <NumericInput
                        key="numeric-wide"
                        value={quantity}
                        min={0}
                        onChange={(val) => setItemQuantity(product, val)}
                        onIncrement={() => incrementItemQuantity(product)}
                        onDecrement={() => decrementItemQuantity(product)}
                        style={{
                          flex: 1,
                          marginRight: 8,
                          height: 32,
                        }}
                        inputWidth={"flex"}
                      />
                      <Button
                        key="wishlist-wide-2"
                        variant="outline"
                        style={{ flex: 1, height: 32 }}
                        accessibilityRole="button"
                      >
                        <ButtonText size="sm" className="text-typography-600">
                          Wishlist
                        </ButtonText>
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            ) : (
              <Box
                style={{
                  flex: 1,
                  minWidth: 0,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  paddingBottom: 24,
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
                    ₹{product.price}
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
                paddingVertical: 0,
                flexDirection: "row",
                gap: 12,
                zIndex: 9999,
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              pointerEvents="auto"
            >
              {quantity === 0 ? (
                <>
                  <Button
                    key="add-bottom"
                    onPress={() => addToCart(product)}
                    className="px-4 py-2 flex-1 rounded-md flex-row items-center justify-center"
                    accessibilityRole="button"
                    style={{
                      height: 32,
                      backgroundColor: "#D4AF37",
                    }}
                  >
                    <ShoppingCart
                      size={16}
                      color="#fff"
                      style={{ marginRight: 6 }}
                    />
                    <ButtonText size="sm">Add to Cart</ButtonText>
                  </Button>
                  <Button
                    key="wishlist-bottom"
                    variant="outline"
                    className="px-4 py-2 flex-1 rounded-md"
                    accessibilityRole="button"
                    style={{ height: 32 }}
                  >
                    <ButtonText size="sm" className="text-typography-600">
                      Wishlist
                    </ButtonText>
                  </Button>
                </>
              ) : (
                <>
                  <NumericInput
                    key="numeric-bottom"
                    value={quantity}
                    min={0}
                    onChange={(val) => setItemQuantity(product, val)}
                    onIncrement={() => incrementItemQuantity(product)}
                    onDecrement={() => decrementItemQuantity(product)}
                    style={{
                      flex: 1,
                      marginRight: 8,
                      height: 32,
                    }}
                    inputWidth={"flex"}
                  />
                  <Button
                    key="wishlist-bottom-2"
                    variant="outline"
                    className="px-4 py-2 flex-1 rounded-md"
                    accessibilityRole="button"
                    style={{ height: 32 }}
                  >
                    <ButtonText size="sm" className="text-typography-600">
                      Wishlist
                    </ButtonText>
                  </Button>
                </>
              )}
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
}
