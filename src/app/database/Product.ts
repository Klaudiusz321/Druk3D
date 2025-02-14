// src/app/database/Product.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Nasze własne pole identyfikatora jako liczba
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

// Jeśli model już istnieje, używamy go, w przeciwnym razie tworzymy nowy.
export default mongoose.models.Product || mongoose.model("Product", productSchema);
