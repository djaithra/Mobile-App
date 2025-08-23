import * as React from "react";
import "@/global.css";
import { Link, Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShoppingBag } from "lucide-react-native";
import useCart from "@/store/cartstore";
import { Text } from "@/components/ui/text";

const queryClient = new QueryClient();

export default function RootLayout() {
  const cartItems = useCart((state) => state.items.length);
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () =>
              cartItems > 0 && (
                <Link href="/cart" className="flex-row gap-2 align-middle">
                  <ShoppingBag />
                  <Text>{cartItems}</Text>
                </Link>
              ),
          }}
        >
          <Stack.Screen
            name="index"
            options={{ title: "Shop", headerTitleAlign: "center" }}
          />
          <Stack.Screen
            name="product/[id]"
            options={{ title: "Product", headerTitleAlign: "center" }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
