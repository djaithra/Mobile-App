import React from "react";
import { Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type ZoomableImageProps = {
  uri: string;
};

const ZoomableImage: React.FC<ZoomableImageProps> = ({ uri }) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const lastTranslateX = useSharedValue(0);
  const lastTranslateY = useSharedValue(0);
  const containerWidth = 320; // or useWindowDimensions().width for responsive
  const containerHeight = 240;

  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        // Calculate max pan based on scale
        const scaledWidth = containerWidth * scale.value;
        const scaledHeight = containerHeight * scale.value;
        const maxX = Math.max(0, (scaledWidth - containerWidth) / 2);
        const maxY = Math.max(0, (scaledHeight - containerHeight) / 2);
        let nextX = lastTranslateX.value + e.translationX;
        let nextY = lastTranslateY.value + e.translationY;
        // Clamp
        nextX = Math.max(-maxX, Math.min(maxX, nextX));
        nextY = Math.max(-maxY, Math.min(maxY, nextY));
        translateX.value = nextX;
        translateY.value = nextY;
      }
    })
    .onEnd(() => {
      lastTranslateX.value = translateX.value;
      lastTranslateY.value = translateY.value;
    });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: scale.value > 1 ? translateX.value : 0 },
      { translateY: scale.value > 1 ? translateY.value : 0 },
    ],
  }));

  return (
    <GestureDetector gesture={composed}>
      <Animated.View
        style={{
          width: containerWidth,
          height: containerHeight,
          alignSelf: "center",
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.Image
          source={{ uri }}
          style={[
            { width: "100%", height: "100%", borderRadius: 8 },
            animatedStyle,
          ]}
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default ZoomableImage;
