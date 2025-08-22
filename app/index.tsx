import { FlatList, useWindowDimensions } from "react-native";
import React = require("react");
import products from "@/assets/products.json";
import ProductListItem from "@/components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";

export default function HomeScreen() {
  const numColumns =
    (useBreakpointValue({ base: 2, md: 3, lg: 4 }) as number) ?? 2;
  return (
    <FlatList
      key={numColumns}
      numColumns={numColumns}
      data={products}
      contentContainerClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
