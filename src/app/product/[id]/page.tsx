"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { formatCurrency } from "@/app/utilities/formatCurrency";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const ProductPage = () => {
  const { id } = useParams(); // Pobiera dynamiczny parametr "id" z URL
  const router = useRouter(); // Hook do przekierowywania
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Błąd pobierania produktu");
        } else {
          // Zakładamy, że API zwraca produkt jako sam obiekt JSON
          setProduct(data);
        }
      } catch (err) {
        console.error(err);
        setError("Błąd sieciowy");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleOrder = async () => {
    if (!product) return;
    try {
      const orderData = {
        user: "guest", // Możesz tu pobierać dane zalogowanego użytkownika
        products: [{ productId: product.id, quantity: 1 }],
        total: product.price,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        // Po utworzeniu zamówienia przekierowujemy użytkownika do strony zamówień
        router.push("/orders");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Błąd tworzenia zamówienia");
      }
    } catch (err) {
      console.error(err);
      setError("Błąd sieciowy podczas tworzenia zamówienia");
    }
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

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 text-lg">Produkt nie znaleziony</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded"
        />
        <h1 className="text-4xl font-bold mt-4">{product.name}</h1>
        <p className="text-xl text-gray-700 mt-2">{formatCurrency(product.price)}</p>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <button
          onClick={handleOrder}
          className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Zamów
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
