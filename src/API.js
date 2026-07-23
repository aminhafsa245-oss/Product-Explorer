export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}