"use client";

import { useRevelar } from "@/components/useRevelar";

export type Tramo = { cargo: string; meses: number; texto: string };

const R = 50;
const GAP = 1.2; // separación entre tramos, en % de la vuelta
// Del tramo más viejo al actual: de gris a negro
const COLORES = ["var(--muted)", "#4a4944", "var(--ink)"];

// Anillo con un tramo por puesto (proporcional a su duración) y el total al centro.
export function AnilloExperiencia({ tramos, total }: { tramos: Tramo[]; total: string }) {
  const ref = useRevelar<HTMLDivElement>(0.4);
  const suma = tramos.reduce((a, t) => a + t.meses, 0);
  const arcos = tramos.map((t, i) => {
    const inicio = tramos.slice(0, i).reduce((a, x) => a + (x.meses / suma) * 100, 0);
    const largo = (t.meses / suma) * 100;
    return { ...t, inicio, largo: Math.max(largo - GAP, 0.5), color: COLORES[i % COLORES.length] };
  });

  return (
    <div ref={ref} data-revelar="anillo" className="flex h-full flex-col">
      <h2 className="text-sm font-medium text-muted">Experiencia</h2>
      <figure className="mt-3 flex flex-1 flex-col items-center justify-center">
        <div className="relative size-40">
          <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
            <circle cx="60" cy="60" r={R} fill="none" stroke="var(--track)" strokeWidth="12" />
            {arcos.map((a, i) => (
              <circle
                key={a.cargo}
                data-tramo
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke={a.color}
                strokeWidth="12"
                pathLength={100}
                strokeDashoffset={-a.inicio}
                style={{ "--largo": a.largo, "--retraso": `${i * 0.25}s` } as React.CSSProperties}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold tracking-tight">{total}</span>
            <span className="text-[11px] text-muted">en el Consejo</span>
          </div>
        </div>
        <figcaption className="mt-4 w-full space-y-1 text-[13px]">
          {arcos.map((a) => (
            <div key={a.cargo} className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-1.5">
                <span className="size-2.5 shrink-0 rounded-sm" style={{ background: a.color }} />
                <span className="truncate">{a.cargo}</span>
              </span>
              <span className="shrink-0 tabular-nums text-muted">{a.texto}</span>
            </div>
          ))}
        </figcaption>
      </figure>
    </div>
  );
}
