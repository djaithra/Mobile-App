import * as React from "react";
import "@/global.css";
import { Stack, usePathname } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartBadge } from "@/components/CartBadge";
import { Text, Image, Platform } from "react-native";
import Footer from "@/components/footer";
import { useState } from "react";
import { Pressable } from "react-native";
import { Box } from "@/components/ui/box";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  const pathname = usePathname();
  // Drawer removed - no drawer state
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
          <Box style={{ flex: 1, position: "relative" }}>
            <Stack
              screenOptions={{
                headerBackVisible: false,
                headerLeft: () => {
                  return (
                    <Image
                      source={require("@/assets/logo.jpg")}
                      style={{
                        width: Platform.OS === "web" ? 36 : 32,
                        height: Platform.OS === "web" ? 36 : 32,
                        borderRadius: Platform.OS === "web" ? "50%" : 16,
                        objectFit: Platform.OS === "web" ? "cover" : undefined,
                      }}
                      accessibilityLabel="Logo"
                      alt="Logo"
                    />
                  );
                },
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
                headerRight: () => <CartBadge />,
              }}
            >
              <Stack.Screen name="index" options={{}} />
              <Stack.Screen
                name="product/[id]"
                options={{
                  title: "Product",
                  headerTitleAlign: "center",
                }}
              />
              <Stack.Screen
                name="cart"
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
                      Shopping Bag
                    </Text>
                  ),
                  headerTitleAlign: "center",
                }}
              />
            </Stack>
            <Footer />
          </Box>
        </GluestackUIProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
