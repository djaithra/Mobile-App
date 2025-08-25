import * as React from "react";
import "@/global.css";
import { Stack, usePathname } from "expo-router";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartBadge } from "@/components/CartBadge";
import { Text, Image, Platform } from "react-native";
import Footer from "@/components/footer";
import { Box } from "@/components/ui/box";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  const pathname = usePathname();
  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <GluestackUIProvider>
          <Box style={{ flex: 1, position: "relative" }}>
            <Stack
              screenOptions={{
                headerBackVisible: false,
                headerLeft: () => undefined,
                headerRight: () => {
                  // Show CartBadge only on home and product/[id] screens
                  if (pathname === "/" || pathname.startsWith("/product/")) {
                    return (
                      <Box
                        style={Platform.select({
                          web: { marginRight: 18 },
                          default: {},
                        })}
                      >
                        <CartBadge />
                      </Box>
                    );
                  }
                  return null;
                },
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  headerLeft: () => (
                    <Image
                      source={require("@/assets/logo.jpg")}
                      style={Platform.select({
                        web: {
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginLeft: 8,
                        },
                        default: {
                          width: 32,
                          height: 32,
                          borderRadius: 16,
                        },
                      })}
                      accessibilityLabel="Logo"
                      alt="Logo"
                    />
                  ),
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
            {Platform.OS !== "web" && <Footer />}
          </Box>
        </GluestackUIProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
