"use client";

import { Logo } from "@/components/Logos";
import { useRevelar } from "@/components/useRevelar";
import type { Herramienta, Nivel } from "@/data/formacion";

const NIVELES: Record<Nivel, { pasos: number; texto: string }> = {
  basico: { pasos: 1, texto: "Básico" },
  intermedio: { pasos: 2, texto: "Intermedio" },
  avanzado: { pasos: 3, texto: "Avanzado" },
};

// Herramientas con nivel de conocimiento en una escala de 3 pasos.
export function Herramientas({ items }: { items: Herramienta[] }) {
  const ref = useRevelar<HTMLDivElement>(0.3);

  return (
    <div ref={ref} data-revelar="barras">
      <h2 className="text-base font-semibold tracking-tight">Herramientas</h2>
      <p className="text-xs text-muted">Nivel de conocimiento</p>
      <ul className="mt-3 space-y-2.5">
        {items.map((h, i) => {
          const { pasos, texto } = NIVELES[h.nivel];
          return (
            <li key={h.nombre} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 text-[13px]">
              <span className="flex min-w-0 items-center gap-1.5 font-medium">
                {/* Columna fija para que los nombres queden alineados (SQL va sin logo) */}
                <span className="flex w-[2.375rem] shrink-0 gap-1">
                  {h.logos?.map((l) => (
                    <Logo key={l} nombre={l} className="size-[17px]" />
                  ))}
                </span>
                {h.nombre}
                {h.detalle && <span className="font-normal text-muted"> · {h.detalle}</span>}
              </span>
              <span className="text-xs text-muted">{texto}</span>
              <span aria-hidden className="col-span-2 grid grid-cols-3 gap-1">
                {[1, 2, 3].map((n) => (
                  <span key={n} className="h-1.5 overflow-hidden rounded-full bg-track">
                    {n <= pasos && (
                      <span
                        data-barra="h"
                        className="block size-full rounded-full bg-ink"
                        style={{ "--retraso": `${i * 0.06 + n * 0.12}s` } as React.CSSProperties}
                      />
                    )}
                  </span>
                ))}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
