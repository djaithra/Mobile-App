import { View, FlatList } from "react-native";
import React = require("react");
import { Button, ButtonText } from "@/components/ui/button"
import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
// import { Link, LinkText } from "@/components/ui/link";
// import { HStack } from "@/components/ui/hstack";
// import { Icon, ArrowRightIcon  } from "@/components/ui/icon";
import products from "@/assets/products.json"
import ProductListItem from "@/components/ProductListItem";

export default function HomeScreen() {
  return (
       <FlatList data={products} renderItem={({ item }) => (
         <VStack space="md" className="p-5">
           <ProductListItem product={item} />
         </VStack>
       )} 
       />
  );
}


