"use client";

import { useEffect, useRef } from "react";

// Marca el elemento con data-visible la primera vez que entra en pantalla.
// La animación vive en CSS (globals.css, [data-revelar]) y solo corre si hay JS
// y el usuario no pidió movimiento reducido; sin eso, el contenido se ve completo.
export function useRevelar<T extends HTMLElement>(umbral = 0.5) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.setAttribute("data-visible", "");
          obs.disconnect();
        }
      },
      { threshold: umbral },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [umbral]);
  return ref;
}
