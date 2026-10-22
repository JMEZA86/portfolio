"use client";

import { useRevelar } from "@/components/useRevelar";

type Tramo = { label: string; cantidad: number; porcentaje: number };

// Dos pastillas (negra y amarilla) con ancho proporcional; los valores llegan calculados desde data/.
export function Balance({ automatizacion, datos }: { automatizacion: Tramo; datos: Tramo }) {
  const ref = useRevelar<HTMLDivElement>(0.6);
  const plural = (n: number) => `${n} ${n === 1 ? "proyecto" : "proyectos"}`;
  const tramos = [
    { ...automatizacion, clase: "bg-ink text-card" },
    { ...datos, clase: "bg-accent text-ink" },
  ];

  return (
    <div ref={ref} data-revelar="barra">
      <ul data-relleno className="flex gap-1.5">
        {tramos.map((t) => (
          <li key={t.label} className="min-w-0" style={{ flexGrow: Math.max(t.porcentaje, 1), flexBasis: 0 }}>
            <span className="block truncate pb-1 pl-1 text-[11px] text-muted">{t.label}</span>
            <span className={`flex h-7 items-center rounded-full px-2.5 text-xs font-medium tabular-nums ${t.clase}`}>
              {t.porcentaje}%
            </span>
            <span className="sr-only">({plural(t.cantidad)})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
