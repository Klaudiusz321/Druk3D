"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const StorePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pobieramy produkty z API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Błąd pobierania produktów");
        } else {
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error("Network error:", err);
        setError("Błąd sieciowy");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Funkcja zamawiania produktu – dodaje produkt do localStorage jako zamówienie
  const orderProduct = (product: Product) => {
    // Pobierz obecne zamówienia z localStorage (jeśli nie ma, ustal pustą tablicę)
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    // Dodaj nowy produkt do zamówień, dodając datę zamówienia
    existingOrders.push({ ...product, orderedAt: new Date().toISOString() });
    localStorage.setItem("orders", JSON.stringify(existingOrders));
    alert(`Produkt "${product.name}" został zamówiony!`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Sklep</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mt-4">
              {product.name}
            </h2>
            <p className="text-gray-600">Cena: {product.price} zł</p>
            <p className="text-gray-700 mt-2">{product.description}</p>
            <div className="flex gap-4 mt-4">
              <Link href={`/product/${product.id}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Zobacz szczegóły
                </button>
              </Link>
              <button
                onClick={() => orderProduct(product)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Zamów
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorePage;
