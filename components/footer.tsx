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
import { Pressable } from "react-native";
import { Drawer } from "@/components/ui/drawer";
import AppDrawer from "@/components/AppDrawer";
import { useRouter, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface FooterProps {
  drawerOpen?: boolean;
  setDrawerOpen?: (open: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ drawerOpen, setDrawerOpen }) => {
  const [internalDrawerOpen, setInternalDrawerOpen] = useState(false);
  const router = useRouter();
  const isWeb = typeof window !== "undefined" && window.document;
  const open =
    isWeb && typeof drawerOpen === "boolean" ? drawerOpen : internalDrawerOpen;
  const setOpen =
    isWeb && typeof setDrawerOpen === "function"
      ? setDrawerOpen
      : setInternalDrawerOpen;
  const pathname = usePathname();

  // Always close Drawer on route change
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
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
              onPress={() => setOpen(true)}
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
      <Drawer
        visible={open}
        onClose={() => setOpen(false)}
        anchor="left"
        width={isWeb ? 300 : undefined}
      >
        <AppDrawer onClose={() => setOpen(false)} />
      </Drawer>
    </>
  );
};

export default Footer;
