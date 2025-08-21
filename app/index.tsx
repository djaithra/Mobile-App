import { View, FlatList } from "react-native";
import React = require("react");
import { Button, ButtonText } from "@/components/ui/button"
import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack";
import { Image } from "react-native";
import { Card } from "@/components/ui/card";
export default function HomeScreen() {
  return (
    <>
      <VStack space="md">
        <Box className="bg-primary-500 p-5">
          <Text className="text-typography-0">This is the Box</Text>
        </Box>    
      </VStack>
      <VStack space="md" className="p-5">
        <Button className="bg-primary-500">
          <ButtonText className="text-typography-0">Click Me</ButtonText>
        </Button>
        <Card className="bg-secondary-500 p-5">
          <Text className="text-typography-0">This is a Card</Text>
        </Card>
        <Image
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
          style={{ width: 100, height: 100 }}
        />
      </VStack>
    </>
  );
}


