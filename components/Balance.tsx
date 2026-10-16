"use client";

import { useRevelar } from "@/components/useRevelar";

type Tramo = { label: string; cantidad: number; porcentaje: number };

// Barra de dos tramos (crema y amarillo) para la tarjeta oscura de proyectos.
// Los valores llegan calculados desde data/.
export function Balance({ automatizacion, datos }: { automatizacion: Tramo; datos: Tramo }) {
  const ref = useRevelar<HTMLDivElement>(0.6);
  const plural = (n: number) => `${n} ${n === 1 ? "proyecto" : "proyectos"}`;
  const resumen = `${automatizacion.label}: ${automatizacion.porcentaje}% (${plural(automatizacion.cantidad)}). ${datos.label}: ${datos.porcentaje}% (${plural(datos.cantidad)}).`;

  return (
    <>
      <div
        ref={ref}
        data-revelar="barra"
        role="img"
        aria-label={resumen}
        className="h-9 overflow-hidden rounded-lg bg-white/10 text-[13px] font-semibold"
      >
        {/* El recorte va en un hijo: el observer mira al contenedor, que nunca está recortado */}
        <div data-relleno className="flex h-full">
          <div className="flex items-center bg-card px-3 text-ink" style={{ width: `${automatizacion.porcentaje}%` }}>
            {automatizacion.porcentaje >= 12 && `${automatizacion.porcentaje}%`}
          </div>
          <div className="flex items-center bg-accent px-3 text-ink" style={{ width: `${datos.porcentaje}%` }}>
            {datos.porcentaje >= 12 && `${datos.porcentaje}%`}
          </div>
        </div>
      </div>
      <div aria-hidden className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-card/75">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-card" />
          {automatizacion.label} · {plural(automatizacion.cantidad)}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-accent" />
          {datos.label} · {plural(datos.cantidad)}
        </span>
      </div>
    </>
  );
}
