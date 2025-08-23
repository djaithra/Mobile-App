import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image, Pressable } from "react-native";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import * as React from "react";
import INRDisplay from "@/components/INRDisplay";
import { Link } from "expo-router";
import { useAddToCart } from "@/hooks/useAddToCart";

interface Product {
  id: string | number;
  image: string;
  name: string;
  description: string;
  price: number | string;
}

interface ProductListItemProps {
  product: Product;
}

export default function ProductListItem({ product }: ProductListItemProps) {
  const addToCart = useAddToCart();
  return (
    <Box className="flex-1 m-1">
      <Link href={`/product/${product.id}`} asChild>
        <Pressable className="flex-1">
          <Card className="flex-1 p-5 rounded-lg overflow-hidden">
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
          </Card>
        </Pressable>
      </Link>
      <Box className="flex-col sm:flex-row mt-2">
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
  );
}
