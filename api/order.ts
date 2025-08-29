import { useAuth } from "@/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items: any[]) {
  const token = (useAuth.getState() as { token: string }).token;
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ order: {}, items }),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Failed to create order");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
