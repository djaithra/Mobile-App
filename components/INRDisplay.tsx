import React from "react";
import { Text } from "@/components/ui/text";


interface PriceTagProps {
  amount: number | string;
}

export default function PriceTag({ amount }: PriceTagProps) {
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Number(amount));

  return (
    <Text className="font-bold text-lg text-typography-900">
      {formattedPrice}
    </Text>
  );
}

