// components/Footer.tsx
import React from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { LucideHome, SettingsIcon, User2Icon } from "lucide-react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Footer = () => {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        paddingBottom: 2,
        paddingTop: 8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 32,
          marginBottom: 4,
        }}
      >
        <LucideHome size={24} color="#D4AF37" />
        <SettingsIcon size={24} color="#D4AF37" />
        <User2Icon size={24} color="#D4AF37" />
      </Box>
    </SafeAreaView>
  );
};

export default Footer;
