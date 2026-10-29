"use client";

import { claseAtenuado, useResaltado } from "@/components/Resaltado";
import { useRevelar } from "@/components/useRevelar";

export type Tramo = {
  clave: string;
  cargo: string;
  meses: number;
  texto: string;
};

const R = 46;
const GAP = 1.2; // separación entre tramos, en % de la vuelta
// Del tramo más viejo al actual: de gris a negro
const COLORES = ["var(--muted)", "#4a4944", "var(--ink)"];

// Anillo con un tramo por puesto (proporcional a su duración) y el total al centro.
type Externo = { clave: string; cargo: string; texto: string };

export function AnilloExperiencia({
  tramos,
  total,
  externos = [],
}: {
  tramos: Tramo[];
  total: string;
  externos?: Externo[]; // puestos fuera del anillo (p. ej. Starbucks): solo se muestran en el centro
}) {
  const ref = useRevelar<HTMLDivElement>(0.4);
  const { clave, resaltar } = useResaltado();
  const elegido = tramos.find((t) => t.clave === clave) ?? externos.find((t) => t.clave === clave);
  const suma = tramos.reduce((a, t) => a + t.meses, 0);
  const arcos = tramos.map((t, i) => {
    const inicio = tramos
      .slice(0, i)
      .reduce((a, x) => a + (x.meses / suma) * 100, 0);
    const largo = (t.meses / suma) * 100;
    return {
      ...t,
      inicio,
      largo: Math.max(largo - GAP, 0.5),
      color: COLORES[i % COLORES.length],
    };
  });

  return (
    <div ref={ref} data-revelar="anillo" className="flex h-full flex-col">
      <h2 className="text-base font-semibold tracking-tight">Trayectoria</h2>
      <p className="text-xs text-muted">Años en el Consejo</p>
      <figure className="mt-2 flex flex-1 items-center gap-5 sm:flex-col sm:justify-center sm:gap-0">
        <div className="relative size-32 shrink-0 sm:size-36">
          <svg
            viewBox="0 0 120 120"
            className="size-full -rotate-90"
            aria-hidden
          >
            {/* Marcas alrededor, como un reloj */}
            <circle
              cx="60"
              cy="60"
              r="58"
              fill="none"
              stroke="var(--track)"
              strokeWidth="4"
              pathLength={120}
              strokeDasharray="0.5 1.5"
            />
            <circle
              cx="60"
              cy="60"
              r={R}
              fill="none"
              stroke="var(--track)"
              strokeWidth="10"
            />
            {arcos.map((a, i) => (
              <circle
                key={a.clave}
                data-tramo
                className={`transition-opacity duration-200 ${claseAtenuado(clave, a.clave)}`}
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke={a.color}
                strokeWidth="10"
                strokeLinecap="butt"
                pathLength={100}
                strokeDashoffset={-a.inicio}
                style={
                  {
                    "--largo": a.largo,
                    "--retraso": `${i * 0.25}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-semibold tracking-tight sm:text-xl">
              {elegido ? elegido.texto : total}
            </span>
            <span className="max-w-20 text-center text-[10px] leading-tight text-muted sm:text-[11px]">
              {elegido ? elegido.cargo : "en el Consejo"}
            </span>
          </div>
        </div>
        <figcaption className="w-full min-w-0 space-y-1 text-xs sm:mt-3">
          {arcos.map((a) => (
            <div
              key={a.clave}
              onMouseEnter={() => resaltar(a.clave)}
              onMouseLeave={() => resaltar(null)}
              className={`flex items-center justify-between gap-2 py-0.5 transition-opacity duration-200 ${claseAtenuado(clave, a.clave)}`}
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <span
                  className="size-2.5 shrink-0 rounded-sm"
                  style={{ background: a.color }}
                />
                <span className="sm:truncate">{a.cargo}</span>
              </span>
              <span className="shrink-0 tabular-nums text-muted">
                {a.texto}
              </span>
            </div>
          ))}
        </figcaption>
      </figure>
    </div>
  );
}
