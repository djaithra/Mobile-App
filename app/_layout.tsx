import * as React from "react";
import "@/global.css";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartBadge } from "@/components/CartBadge";
import { Text } from "react-native";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider>
        <Stack
          screenOptions={{
            headerRight: () => <CartBadge />,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerTitle: () => (
                <Text
                  style={{
                    fontStyle: "italic",
                    color: "#D4AF37",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  Dhanvi Creations
                </Text>
              ),

              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="product/[id]"
            options={{
              title: "Product",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
