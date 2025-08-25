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

  const pinchGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = lastTranslateX.value + e.translationX;
        translateY.value = lastTranslateY.value + e.translationY;
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
      <Animated.View style={[{ width: "100%", height: 240 }, animatedStyle]}>
        <Image
          source={{ uri }}
          style={{ width: "100%", height: "100%", borderRadius: 8 }}
          resizeMode="contain"
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default ZoomableImage;
