"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

// Número que sube contando la primera vez que aparece en pantalla.
// El HTML ya trae el valor final (sin JS o con movimiento reducido se ve directo).
export function Contador({ valor, duracion = 1.2 }: { valor: number; duracion?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true });
  const reducido = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !enVista || reducido) return;
    const control = animate(0, valor, {
      duration: duracion,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => control.stop();
  }, [enVista, reducido, valor, duracion]);

  return (
    <>
      <span ref={ref} aria-hidden className="tabular-nums">
        {valor}
      </span>
      <span className="sr-only">{valor}</span>
    </>
  );
}
