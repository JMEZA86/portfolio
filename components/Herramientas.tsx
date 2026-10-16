"use client";

import { useRevelar } from "@/components/useRevelar";

type Uso = { herramienta: string; proyectos: number };

// Proyectos por herramienta. Barras verticales en escritorio, horizontales en pantallas chicas.
export function Herramientas({ usos }: { usos: Uso[] }) {
  const ref = useRevelar<HTMLDivElement>(0.3);
  const max = Math.max(...usos.map((u) => u.proyectos), 1);
  const pct = (n: number) => `${(n / max) * 100}%`;
  const retraso = (i: number) => ({ "--retraso": `${i * 0.05}s` }) as React.CSSProperties;

  return (
    <div ref={ref} data-revelar="barras">
      <h2 className="text-lg font-semibold tracking-tight">Herramientas</h2>
      <p className="text-[13px] text-muted">Cantidad de proyectos que usan cada una</p>

      {/* Celular y tablet: horizontales */}
      <ul className="mt-4 space-y-2 lg:hidden">
        {usos.map((u, i) => (
          <li key={u.herramienta} className="grid grid-cols-[7.5rem_1fr_1.5rem] items-center gap-2 text-[13px]">
            <span className="truncate">{u.herramienta}</span>
            <span className="h-3 rounded-full bg-track">
              <span
                data-barra="h"
                className="block h-full rounded-full bg-ink"
                style={{ width: pct(u.proyectos), ...retraso(i) }}
              />
            </span>
            <span className="text-right font-semibold tabular-nums">{u.proyectos}</span>
          </li>
        ))}
      </ul>

      {/* Escritorio: verticales */}
      <ul className="mt-5 hidden items-end gap-1.5 lg:flex">
        {usos.map((u, i) => (
          <li key={u.herramienta} className="flex min-w-0 flex-1 flex-col items-center">
            <span className="text-[11px] font-semibold tabular-nums">{u.proyectos}</span>
            <span className="mt-1 flex h-28 w-full max-w-7 items-end">
              <span
                data-barra="v"
                className="block w-full rounded-t-md rounded-b-sm bg-ink"
                style={{ height: pct(u.proyectos), ...retraso(i) }}
              />
            </span>
            <span className="mt-2 h-7 text-center text-[10px] leading-tight text-muted">{u.herramienta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
