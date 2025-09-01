// components/Footer.tsx
import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const Footer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();
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
          {/* User Info Section */}
          <Box style={{ marginBottom: 32 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, marginBottom: 4 }}>
              John Doe
            </Text>
            <Text style={{ color: "#888", fontSize: 14 }}>
              123 Main St, City, Country
            </Text>
          </Box>
          {/* Menu Items */}
          <Pressable
            onPress={() => {
              setDrawerOpen(false);
              // Add navigation for My Account here
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <User2Icon size={22} color="#D4AF37" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
              My Account
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDrawerOpen(false);
              // Add navigation for Shop By Category here
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <ShoppingBagIcon size={22} color="#D4AF37" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
              Shop By Category
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDrawerOpen(false);
              // Add navigation for Notifications here
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <BellIcon size={22} color="#D4AF37" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
              Notifications
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDrawerOpen(false);
              // Add navigation for Rate our App here
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <StarIcon size={22} color="#D4AF37" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
              Rate our app
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDrawerOpen(false);
              // Add navigation for Need help? here
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <HelpCircleIcon size={22} color="#D4AF37" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
              Need Help?
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setDrawerOpen(false); /* Add signout logic here */
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <LogOutIcon size={22} color="#D4AF37" />
            <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
              Signout
            </Text>
          </Pressable>
        </Box>
      </Drawer>
    </>
  );
};

export default Footer;
