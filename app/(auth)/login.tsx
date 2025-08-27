import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import React, { useState } from "react";
import { HStack } from "@gluestack-ui/themed";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };
  return (
    <FormControl className="p-4 border rounded-lg border-outline-300 w-full max-w-[400px] mx-auto bg-white">
      <VStack space="xl">
        <Heading className="text-typography-900">Login</Heading>
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
        <HStack className="gap-3 w-full mt-4">
          <Button
            variant="outline"
            onPress={() => {}}
            className="min-w-[100px]"
          >
            <ButtonText className="text-typography-900">Sign Up</ButtonText>
          </Button>
          <Button
            className="px-4 py-2 rounded-md min-w-[100px]"
            variant="solid"
            style={{ backgroundColor: "#D4AF37" }}
            onPress={() => {}}
          >
            <ButtonText className="text-typography-900">Login</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
