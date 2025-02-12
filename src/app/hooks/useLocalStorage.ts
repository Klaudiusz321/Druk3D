import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  // Inicjalizacja stanu: próbuje pobrać wartość z localStorage dla podanego klucza.
  // Jeśli wartość istnieje, parsuje ją z JSON. W przeciwnym razie używa podanego initialValue.
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    return typeof initialValue === "function"
      ? (initialValue as () => T)()
      : initialValue;
  });

  // Za każdym razem, gdy key lub value ulegną zmianie, zapisujemy nową wartość do localStorage.
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as [typeof value, typeof setValue];
}
