import { Text } from "react-native";

export default function ProductListItem({ product }) {
  return (
    <Text style={{ fontSize: 24, fontWeight: "bold" }}>{product.name}</Text>
  );
}