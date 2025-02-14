// src/app/api/products/[id]/route.ts
import connectDB from "@/app/lib/connectDB";
import Product from "@/app/database/Product";

export async function GET(
  request: Request,
  { params }: { params: { id: string } | Promise<{ id: string }> }
) {
  // Oczekujemy parametrów
  const { id } = await params;
  console.log("Otrzymany parametr id (jako string):", id);
  console.log("Otrzymany parametr id (jako liczba):", Number(id));

  try {
    await connectDB();

    // Przed wyszukiwaniem, możesz wypisać wszystkie produkty w bazie, aby sprawdzić, czy coś tam jest
    const allProducts = await Product.find({});
    console.log("Wszystkie produkty w bazie:", allProducts);

    // Wyszukujemy produkt na podstawie pola id (konwertując id na liczbę)
    const product = await Product.findOne({ id: Number(id) });
    if (!product) {
      console.log("Produkt o id =", id, "nie został znaleziony w bazie.");
      return new Response("Not found", { status: 404 });
    }
    console.log("Znaleziono produkt:", product);
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    console.error("Błąd w API:", error);
    return new Response("Server error", { status: 500 });
  }
}
