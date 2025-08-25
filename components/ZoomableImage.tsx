import React from "react";
import { Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export default function ZoomableImage({ uri }: { uri: string }) {
  const scale = useSharedValue(1);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View style={[{ width: "100%", height: 240 }, animatedStyle]}>
        <Image
          source={{ uri }}
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
}
