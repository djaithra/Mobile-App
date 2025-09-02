import React, { useState } from "react";
import { View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { TextInput } from "react-native";

interface NumericInputProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  style?: any;
  buttonStyle?: any;
  inputStyle?: any;
  className?: string;
  /**
   * Controls the width of the numeric input field.
   * - number -> fixed pixel width
   * - string -> passed directly to style.width (e.g. '50%')
   * - 'flex' -> input will expand to fill available space (flex: 1)
   */
  inputWidth?: number | string | "flex";
  disabled?: boolean;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  min = 1,
  max = Number.MAX_SAFE_INTEGER,
  onChange,
  onIncrement,
  onDecrement,
  style = {},
  buttonStyle = {},
  inputStyle = {},
  inputWidth = 35,
  className = "",
  disabled = false,
}) => {
  const handleInputChange = (val: string) => {
    if (/^\d*$/.test(val)) {
      let num = parseInt(val, 10);
      if (isNaN(num)) num = min;
      if (num < min) num = min;
      if (num > max) num = max;
      onChange(num);
    }
  };
  // Flatten style arrays for web compatibility
  const flatStyle = Array.isArray(style) ? Object.assign({}, ...style) : style;
  const flatInputStyle = Array.isArray(inputStyle)
    ? Object.assign({}, ...inputStyle)
    : inputStyle;
  const flatButtonStyle = Array.isArray(buttonStyle)
    ? Object.assign({}, ...buttonStyle)
    : buttonStyle;

  // measure container width to calculate flexible button/input widths
  const [containerWidth, setContainerWidth] = useState<number>(0);

  // compute width style for the TextInput and buttons
  let computedInputWidthStyle: any = {};
  let computedButtonWidth = 48; // default fallback
  let controlsHeight = 32;

  if (inputWidth === "flex") {
    if (containerWidth > 0) {
      // allocate ~39% of container width to each button, remaining to input
      const buttonAlloc = Math.max(48, Math.floor(containerWidth * 0.39));
      // ensure there is at least 48px for input
      const inputAlloc = Math.max(48, containerWidth - buttonAlloc * 2 - 8);
      computedButtonWidth = buttonAlloc;
      computedInputWidthStyle = { width: inputAlloc };
    } else {
      // unknown container yet, fall back to flex so layout won't break
      computedInputWidthStyle = { flex: 1, minWidth: 35 };
    }
  } else if (typeof inputWidth === "string") {
    computedInputWidthStyle = { width: inputWidth };
  } else if (typeof inputWidth === "number") {
    computedInputWidthStyle = { width: inputWidth };
  }
  return (
    <View
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      style={[
        {
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        },
        flatStyle,
      ]}
      className={className}
    >
      <Button
        onPress={onDecrement}
        style={{
          backgroundColor: "#D4AF37",
          width: computedButtonWidth,
          height: controlsHeight,
          paddingHorizontal: 0,
          marginLeft: 8,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          alignItems: "center",
          justifyContent: "center",
          ...flatButtonStyle,
        }}
        disabled={disabled || value <= min}
      >
        <ButtonText style={{ fontWeight: "bold", fontSize: 18 }}>-</ButtonText>
      </Button>
      <TextInput
        value={value.toString()}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        style={{
          // width may be numeric, percentage string, or flex
          ...computedInputWidthStyle,
          height: controlsHeight,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#D4AF37",
          textAlign: "center",
          fontWeight: "normal",
          fontSize: 13,
          paddingVertical: 0,
          paddingHorizontal: 0,
          backgroundColor: disabled ? "#f5f5f5" : "#fff",
          borderRadius: 0,
          ...flatInputStyle,
        }}
        editable={!disabled}
        onBlur={() => {
          if (value < min) onChange(min);
          if (value > max) onChange(max);
        }}
      />
      <Button
        onPress={onIncrement}
        style={{
          backgroundColor: "#D4AF37",
          width: computedButtonWidth,
          height: controlsHeight,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 6,
          borderBottomRightRadius: 6,
          alignItems: "center",
          justifyContent: "center",
          ...flatButtonStyle,
        }}
        disabled={disabled || value >= max}
      >
        <ButtonText style={{ fontWeight: "bold", fontSize: 18 }}>+</ButtonText>
      </Button>
    </View>
  );
};

export default NumericInput;
