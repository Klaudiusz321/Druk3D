"use client";

import React, { useEffect, useState } from "react";
import { CheckoutButton } from "../components/CheckoutButton";

interface Order {
  id: number;
  name: string;
  price: number;
  quantity: number;
  orderedAt: string;
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Funkcja ładowania zamówień z localStorage
  const loadOrders = () => {
    const ordersData = localStorage.getItem("orders");
    if (ordersData) {
      try {
        const parsedOrders = JSON.parse(ordersData) as Order[];
        setOrders(parsedOrders);
      } catch (error) {
        console.error("Błąd parsowania zamówień:", error);
      }
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Funkcja usuwająca zamówienie z listy i localStorage
  const removeOrder = (index: number) => {
    const updatedOrders = [...orders];
    updatedOrders.splice(index, 1);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Funkcja symulująca płatność i usuwająca zamówienie
  const payOrder = (order: Order, index: number) => {
    // Tutaj można dodać logikę integracji z systemem płatności
    alert(`Zapłacono za ${order.name}`);
    removeOrder(index);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Twoje zamówienia</h1>
        <p className="text-gray-700">Brak zamówień.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Twoje zamówienia</h1>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold">{order.name}</h2>
            <p className="text-gray-600">
              Cena: {order.price} zł x {order.quantity}
            </p>
            <p className="text-gray-600">
              Zamówiono: {new Date(order.orderedAt).toLocaleString()}
            </p>
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => removeOrder(index)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Usuń
              </button>
              <button
                onClick={() => removeOrder(index)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Pay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
