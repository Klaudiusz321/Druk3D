import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  // Tablica produktów – możesz dostosować strukturę do swoich potrzeb
  products: [
    {
      productId: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Używamy istniejącego modelu, jeśli już został stworzony
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
