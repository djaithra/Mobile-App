import { FlatList, useWindowDimensions } from "react-native";
import React = require("react");
import products from "@/assets/products.json"
import ProductListItem from "@/components/ProductListItem";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  // Set a minimum card width (e.g., 220px)
  const minCardWidth = 200;
  const numColumns = Math.max(1, Math.floor(width / minCardWidth));

  return (
    <FlatList 
      numColumns={numColumns}
      data={products}
      contentContainerClassName="gap-2"
      renderItem={({ item }) => (<ProductListItem product={item} />)}
    />
  );
}


