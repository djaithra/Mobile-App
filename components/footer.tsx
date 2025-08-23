// components/Footer.tsx
import React from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
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
      <Text size="xs" style={{ color: "#D4AF37", fontSize: 11 }}>
        © {new Date().getFullYear()} Dhanvi Creations. All rights reserved.
      </Text>
    </SafeAreaView>
  );
};

export default Footer;
