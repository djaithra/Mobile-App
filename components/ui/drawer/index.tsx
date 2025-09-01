import React from "react";
import {
  View,
  Pressable,
  ScrollView,
  Dimensions,
  StyleSheet,
  Modal,
} from "react-native";
import { Box } from "@/components/ui/box";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  anchor?: "left" | "right" | "bottom" | "top";
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  visible,
  onClose,
  anchor = "left",
  width = screenWidth * 0.6,
  height = screenHeight,
  children,
}) => {
  let drawerStyle: any = {};
  if (anchor === "left" || anchor === "right") {
    drawerStyle = {
      width,
      height: "100%",
      position: "absolute",
      top: 0,
      [anchor]: 0,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
      zIndex: 100,
    };
  } else {
    drawerStyle = {
      width: "100%",
      height,
      position: "absolute",
      [anchor]: 0,
      left: 0,
      backgroundColor: "#fff",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
      zIndex: 100,
    };
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={drawerStyle}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 99,
  },
});
