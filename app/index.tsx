import { FlatList, useWindowDimensions } from "react-native";
import React = require("react");
import products from "@/assets/products.json"
import ProductListItem from "@/components/ProductListItem";

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  // Set minCardWidth based on device type
  const minCardWidth = width < 600 ? 200 : 280;
  const numColumns = Math.max(1, Math.floor(width / minCardWidth));

  return (
    <FlatList 
      key={numColumns}
      numColumns={numColumns}
      data={products}
      contentContainerClassName="gap-2"
      renderItem={({ item }) => (<ProductListItem product={item} />)}
    />
  );
}


