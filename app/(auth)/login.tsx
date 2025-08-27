// Set the screen header title to 'Login' for Expo Router
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { HStack } from "@gluestack-ui/themed";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";

import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function LoginScreen() {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text
          style={{
            fontStyle: "italic",
            color: "#D4AF37",
            fontSize: 24,
            fontWeight: "bold",
            paddingBottom: 8,
          }}
        >
          Sign In
        </Text>
      ),
      headerTitleAlign: "center",
    });
  }, [navigation]);

  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <FormControl className="p-4 border rounded-lg border-outline-300 w-full max-w-[400px] mx-auto bg-white">
      <VStack space="xl">
        <VStack space="xs">
          <Text className="text-typography-500">Email</Text>
          <Input className="min-w-[250px]">
            <InputField type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500">Password</Text>
          <Input className="text-center">
            <InputField type={showPassword ? "text" : "password"} />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
            </InputSlot>
          </Input>
        </VStack>
        <HStack
          className="flex-row w-full mt-4"
          style={{ display: "flex", flexDirection: "row", columnGap: 12 }}
        >
          <Button
            variant="outline"
            onPress={() => {}}
            className="flex-1 min-w-[100px]"
          >
            <ButtonText className="text-typography-900">Sign Up</ButtonText>
          </Button>
          <Button
            className="flex-1 px-4 py-2 rounded-md min-w-[100px]"
            variant="solid"
            style={{ backgroundColor: "#D4AF37" }}
            onPress={() => {}}
          >
            <ButtonText className="text-typography-900">Sign In</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
