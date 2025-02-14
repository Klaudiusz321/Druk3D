import connectDB from "@/app/lib/connectDB"; // Upewnij się, że ścieżka jest poprawna
import Order from "@/app/database/Orders";
// Pobieranie wszystkich zamówień
export async function GET(request: Request) {
  try {
    await connectDB();
    const orders = await Order.find({});
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Błąd podczas pobierania zamówień:", error);
    return new Response("Server error", { status: 500 });
  }
}

// Tworzenie nowego zamówienia
export async function POST(request: Request) {
  try {
    await connectDB();
    // Odczytujemy dane z żądania
    const data = await request.json();

    // Opcjonalnie: Możesz tu dodać walidację danych

    const order = await Order.create(data);
    return new Response(JSON.stringify(order), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Błąd podczas tworzenia zamówienia:", error);
    return new Response("Server error", { status: 500 });
  }
}
