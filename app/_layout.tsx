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
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
          <Box style={{ flex: 1, position: "relative" }}>
            <Stack
              screenOptions={{
                headerBackVisible: false,
                headerLeft: () => {
                  if (Platform.OS === "web") {
                    return (
                      <Pressable
                        onPress={() => setDrawerOpen(true)}
                        style={{ marginLeft: 8 }}
                      >
                        <Image
                          source={require("@/assets/logo.jpg")}
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                          accessibilityLabel="Logo"
                          alt="Logo"
                        />
                      </Pressable>
                    );
                  }
                  return (
                    <Image
                      source={require("@/assets/logo.jpg")}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
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
            <Footer
              drawerOpen={Platform.OS === "web" ? drawerOpen : undefined}
              setDrawerOpen={Platform.OS === "web" ? setDrawerOpen : undefined}
            />
          </Box>
        </GluestackUIProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
