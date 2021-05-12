import { useState, useEffect } from 'react';

export function useLocalState<T = undefined>(key: string, initialValue: T) {
  //Inicializa state si existe en el localStorage si no
  //lo va a inicializar con el initialValue del parametro de la funcion
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return initialValue;
  });

  useEffect(() => {
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  //devolver types correctos para cada uno
  return [value, setValue] as [typeof value, typeof setValue];
}
