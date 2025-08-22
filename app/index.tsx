import { FlatList, useWindowDimensions } from "react-native";
import React = require("react");
//import products from "@/assets/products.json";
import ProductListItem from "@/components/ProductListItem";
import { useBreakpointValue } from "@/components/ui/utils/use-break-point-value";
import { getProducts } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import { Text } from "react-native";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const numColumns =
    (useBreakpointValue({ base: 2, md: 3, lg: 4 }) as number) ?? 2;

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  if (error) {
    return <Text>Error: Fetching Products</Text>;
  }

  return (
    <FlatList
      key={numColumns}
      numColumns={numColumns}
      data={data}
      contentContainerClassName="gap-2"
      renderItem={({ item }) => <ProductListItem product={item} />}
    />
  );
}
