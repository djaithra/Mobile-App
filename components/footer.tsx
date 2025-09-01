// components/Footer.tsx
import React from "react";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import {
  LucideHome,
  SettingsIcon,
  User2Icon,
  MenuIcon,
  LogOutIcon,
} from "lucide-react-native";
import { Pressable } from "react-native";
import { Drawer } from "@/components/ui/drawer";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Footer = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <>
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
            <Pressable
              onPress={() => setDrawerOpen(true)}
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
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        anchor="left"
      >
        <Box style={{ padding: 24 }}>
          <Pressable
            onPress={() => {
              setDrawerOpen(false);
              router.push("/");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <LucideHome size={22} color="#D4AF37" />
            <Text style={{ fontSize: 18, marginLeft: 12 }}>Home</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDrawerOpen(false);
              router.push("/login");
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <User2Icon size={22} color="#D4AF37" />
            <Text style={{ fontSize: 18, marginLeft: 12 }}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDrawerOpen(false); /* Add signout logic here */
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <LogOutIcon size={22} color="#D4AF37" />
            <Text style={{ fontSize: 18, marginLeft: 12 }}>Signout</Text>
          </Pressable>
        </Box>
      </Drawer>
    </>
  );
};

export default Footer;
