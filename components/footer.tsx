// components/Footer.tsx
import React, { useState, useEffect } from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import {
  LucideHome,
  SettingsIcon,
  User2Icon,
  MenuIcon,
  LogOutIcon,
  ShoppingBagIcon,
  BellIcon,
  StarIcon,
  HelpCircleIcon,
} from "lucide-react-native";
import { Pressable, Platform } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isWeb = Platform.OS === "web";

  // Hide footer on web
  if (isWeb) return null;
  // Show footer navigation bar
  return (
    <>
      <SafeAreaView edges={["bottom"]} style={{ backgroundColor: "#fff" }}>
        <Box
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            height: 64,
            borderTopWidth: 1,
            borderColor: "#eee",
            backgroundColor: "#fff",
          }}
        >
          <Box style={{ flex: 1, alignItems: "center" }}>
            <Pressable
              onPress={() => router.push("/")}
              style={{
                alignItems: "center",
                justifyContent: "center",
                minWidth: 40,
              }}
            >
              <LucideHome size={24} color="#D4AF37" />
            </Pressable>
          </Box>
          <Box style={{ flex: 1, alignItems: "center" }}>
            <Pressable
              onPress={() => {
                // Menu action removed; keep placeholder for future actions
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                minWidth: 40,
              }}
            >
              <MenuIcon size={24} color="#D4AF37" />
            </Pressable>
          </Box>
          <Box style={{ flex: 1, alignItems: "center" }}>
            <Pressable
              onPress={() => {
                /* Add settings navigation here */
              }}
              style={{
                alignItems: "center",
                justifyContent: "center",
                minWidth: 40,
              }}
            >
              <SettingsIcon size={24} color="#D4AF37" />
            </Pressable>
          </Box>
          <Box style={{ flex: 1, alignItems: "center" }}>
            <Pressable
              onPress={() => router.push("/login")}
              style={{
                alignItems: "center",
                justifyContent: "center",
                minWidth: 40,
              }}
            >
              <User2Icon size={24} color="#D4AF37" />
            </Pressable>
          </Box>
        </Box>
      </SafeAreaView>
    </>
  );
};

export default Footer;
