import React from "react";
import { Box } from "@/components/ui/box";
import {
  User2Icon,
  ShoppingBagIcon,
  BellIcon,
  StarIcon,
  HelpCircleIcon,
  LogOutIcon,
} from "lucide-react-native";
import { Pressable } from "react-native";
import { Text } from "@/components/ui/text";

export default function AppDrawer({ onClose }: { onClose: () => void }) {
  return (
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
        onPress={onClose}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}
      >
        <User2Icon size={22} color="#D4AF37" />
        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
          My Account
        </Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}
      >
        <ShoppingBagIcon size={22} color="#D4AF37" />
        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
          Shop By Category
        </Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}
      >
        <BellIcon size={22} color="#D4AF37" />
        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
          Notifications
        </Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}
      >
        <StarIcon size={22} color="#D4AF37" />
        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
          Rate our app
        </Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}
      >
        <HelpCircleIcon size={22} color="#D4AF37" />
        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
          Need Help?
        </Text>
      </Pressable>
      <Pressable
        onPress={onClose}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <LogOutIcon size={22} color="#D4AF37" />
        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: 12 }}>
          Signout
        </Text>
      </Pressable>
    </Box>
  );
}
