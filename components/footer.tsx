// components/Footer.tsx
import React from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { LucideHome, SettingsIcon, User2Icon } from "lucide-react-native";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Footer = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        paddingBottom: 50,
        paddingTop: 0,
        minHeight: 90,
        maxHeight: 90,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          width: "100%",
          marginBottom: 0,
          marginTop: 18,
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
          <SettingsIcon size={24} color="#D4AF37" />
        </Box>
        <Box style={{ flex: 1, alignItems: "center" }}>
          <User2Icon size={24} color="#D4AF37" />
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default Footer;
