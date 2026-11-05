"use client";

import { useEffect } from "react";
import { esperarIntro } from "@/lib/intro";

// Entrada suave de las tarjetas [data-card] la primera vez que aparecen.
// La animación vive en CSS y se apaga sin JS o con prefers-reduced-motion.
export function RevelarTarjetas() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entradas) => {
        // Las que aparecen juntas entran en cascada, con un pequeño desfase
        entradas
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            el.style.setProperty("--retraso-card", `${0.5 + i * 0.08}s`);
            el.setAttribute("data-visible", "");
            obs.unobserve(el);
          });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    let activo = true;
    esperarIntro().then(
      () =>
        activo &&
        document
          .querySelectorAll("[data-card]")
          .forEach((el) => obs.observe(el)),
    );
    return () => {
      activo = false;
      obs.disconnect();
    };
  }, []);
  return null;
}
