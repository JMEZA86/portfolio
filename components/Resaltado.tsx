"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Filtro cruzado: al pasar o tocar un puesto en un gráfico, se resalta en todos.
// La clave de cada puesto es su fecha de inicio ("AAAA-MM"); la proyección usa "proyeccion".
type Valor = { clave: string | null; resaltar: (clave: string | null) => void };

const Contexto = createContext<Valor>({ clave: null, resaltar: () => {} });

export function ResaltadoProvider({ children }: { children: ReactNode }) {
  const [clave, resaltar] = useState<string | null>(null);
  return <Contexto.Provider value={{ clave, resaltar }}>{children}</Contexto.Provider>;
}

export function useResaltado() {
  return useContext(Contexto);
}

// Props para que un elemento active el resaltado con mouse, teclado o toque.
export function useDisparador(clave: string) {
  const { clave: actual, resaltar } = useResaltado();
  return {
    onMouseEnter: () => resaltar(clave),
    onMouseLeave: () => resaltar(null),
    onFocus: () => resaltar(clave),
    onBlur: () => resaltar(null),
    // En pantallas táctiles no hay hover: un toque alterna
    onTouchStart: () => resaltar(actual === clave ? null : clave),
  };
}

// Atenuación común: si hay algo resaltado y no es esto, se apaga.
export function claseAtenuado(actual: string | null, clave: string) {
  if (!actual) return "";
  return actual === clave ? "" : "opacity-30";
}
