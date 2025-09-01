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
          backgroundColor: "#D4AF37",
          width: 44,
          height: 32,
          paddingHorizontal: 0,
          marginLeft: 4,
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
          width: 35,
          height: 31,
          borderWidth: 1,
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
          width: 44,
          height: 32,
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
