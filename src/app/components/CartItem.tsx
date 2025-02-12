import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/item.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find(i => i.id === id);
  if (!item) return null;

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-700">
      {/* Obrazek produktu */}
      <img
        src={item.imgUrl}
        alt={item.name}
        className="w-[125px] h-[75px] object-cover rounded"
      />

      {/* Opis produktu */}
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-semibold text-white">{item.name}</span>
          {quantity > 1 && (
            <span className="ml-1 text-gray-400 text-xs">x{quantity}</span>
          )}
        </div>
        {/* Cena jednostkowa została usunięta */}
      </div>

      {/* Łączna cena - wyświetlana tylko raz, w kolorze szarym */}
      <div className="text-gray-400 text-sm">
        {formatCurrency(item.price * quantity)}
      </div>

      {/* Przycisk usuwania produktu */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="border border-red-500 text-red-500 rounded-full px-3 py-1 hover:bg-red-500 hover:text-white transition duration-200"
      >
        &times;
      </button>
    </div>
  );
}
