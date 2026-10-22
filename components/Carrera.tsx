"use client";

import { useRevelar } from "@/components/useRevelar";

export type Fila = {
  cargo: string;
  detalle: string; // duración o "Proyección"
  periodo: string; // texto para lectores de pantalla
  desde: number; // año decimal (2012.33 = mayo 2012)
  hasta: number;
  proyeccion?: boolean;
};

type Props = {
  filas: Fila[];
  eje: { desde: number; hasta: number };
  hoy: { valor: number; texto: string };
};

// Línea de carrera tipo Gantt. El último tramo (forecast) va en amarillo y punteado.
export function Carrera({ filas, eje, hoy }: Props) {
  const ref = useRevelar<HTMLDivElement>(0.3);
  const x = (anio: number) => ((anio - eje.desde) / (eje.hasta - eje.desde)) * 100;
  const ticks: number[] = [];
  for (let a = Math.ceil(eje.desde / 4) * 4; a < eje.hasta; a += 4) ticks.push(a);

  return (
    <div ref={ref} data-revelar="barras">
      <h2 className="text-lg font-semibold tracking-tight">Carrera y forecast</h2>
      <p className="text-[13px] text-muted">
        {eje.desde} – {eje.hasta - 1} · el último tramo es una proyección
      </p>

      <ol className="mt-5 grid grid-cols-1 gap-y-1.5 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-x-3 sm:gap-y-3">
        {filas.map((f, i) => (
          <li key={f.cargo} className="contents">
            <div className="mt-2 flex min-w-0 items-baseline justify-between gap-2 text-[13px] leading-tight first:mt-0 sm:mt-0 sm:block">
              <span className="block font-medium sm:truncate">{f.cargo}</span>
              <span className={f.proyeccion ? "font-semibold" : "text-muted"}>{f.detalle}</span>
              <span className="sr-only">: {f.periodo}</span>
            </div>
            <div aria-hidden className="relative h-7 rounded-lg bg-track">
              <span
                data-barra="h"
                className={`absolute inset-y-0 rounded-lg ${
                  f.proyeccion ? "border-2 border-dashed border-ink bg-accent" : "bg-ink"
                }`}
                style={
                  {
                    left: `${x(f.desde)}%`,
                    width: `${x(f.hasta) - x(f.desde)}%`,
                    "--retraso": `${i * 0.12}s`,
                  } as React.CSSProperties
                }
              />
              <span className="absolute inset-y-0 w-0.5 bg-ink/50 sm:-inset-y-1.5" style={{ left: `${x(hoy.valor)}%` }} />
            </div>
          </li>
        ))}
        {/* Eje de años con la marca de hoy */}
        <li aria-hidden className="contents">
          <span className="hidden sm:block" />
          <span className="relative mt-1 h-4 text-[11px] text-muted sm:mt-0">
            {ticks.map((a) => (
              <span key={a} className="absolute -translate-x-1/2" style={{ left: `${x(a)}%` }}>
                {a}
              </span>
            ))}
          </span>
        </li>
      </ol>

      <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-3 w-5 rounded border-2 border-dashed border-ink bg-accent" />
          Proyección: hacia dónde voy
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="inline-block h-3 w-0.5 bg-ink/50" />
          Hoy ({hoy.texto})
        </span>
      </p>
    </div>
  );
}
