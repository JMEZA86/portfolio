"use client";

import { useEffect } from "react";

// Entrada suave de las tarjetas [data-card] la primera vez que aparecen.
// La animación vive en CSS y se apaga sin JS o con prefers-reduced-motion.
export function RevelarTarjetas() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute("data-visible", "");
          obs.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll("[data-card]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
  return null;
}
