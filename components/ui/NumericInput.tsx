import React from "react";
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
  return (
    <View style={[{ alignItems: "center", flexDirection: "row" }, flatStyle]}>
      <Button
        onPress={onDecrement}
        style={{
          minWidth: 32,
          height: 32,
          paddingHorizontal: 0,
          marginRight: 4,
          ...flatButtonStyle,
        }}
        variant="outline"
        disabled={disabled || value <= min}
      >
        <ButtonText>-</ButtonText>
      </Button>
      <TextInput
        value={value.toString()}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        style={{
          minWidth: 36,
          height: 32,
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          textAlign: "center",
          fontWeight: "bold",
          marginHorizontal: 2,
          paddingVertical: 0,
          paddingHorizontal: 4,
          backgroundColor: disabled ? "#f5f5f5" : "#fff",
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
          minWidth: 32,
          height: 32,
          paddingHorizontal: 0,
          marginLeft: 4,
          ...flatButtonStyle,
        }}
        disabled={disabled || value >= max}
      >
        <ButtonText>+</ButtonText>
      </Button>
    </View>
  );
};

export default NumericInput;
