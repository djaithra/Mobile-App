const API_URL = process.env.EXPO_PUBLIC_API_URL;
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) {
    throw new Error("Error fetching products");
  }
  const data = await response.json();
  return data;
}

export async function getProductById(id: number) {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Product not found");
  }
  const data = await response.json();
  return data;
}
