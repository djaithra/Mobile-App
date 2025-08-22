const API_URL = process.env.EXPO_PUBLIC_API_URL;
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);
  const data = await response.json();
  return data;
}
