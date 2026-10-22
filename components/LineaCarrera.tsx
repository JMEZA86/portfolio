"use client";

import { useRevelar } from "@/components/useRevelar";
import type { TramoCarrera } from "@/lib/resumen";

const ESTILO: Record<TramoCarrera["tipo"], string> = {
  otro: "border border-ink/25 text-ink",
  consejo: "bg-ink text-card",
  proyeccion: "rayado border border-ink/30 text-ink",
};

// Barra horizontal de la carrera: un tramo por puesto, ancho proporcional a su duración.
// El último tramo (Data Analyst) es la proyección, rayado en amarillo.
export function LineaCarrera({ tramos }: { tramos: TramoCarrera[] }) {
  const ref = useRevelar<HTMLDivElement>(0.5);
  const total = tramos.reduce((a, t) => a + t.meses, 0);

  return (
    <section id="carrera" aria-labelledby="carrera-titulo">
      <h2 id="carrera-titulo" className="sr-only">
        Línea de carrera
      </h2>
      <div ref={ref} data-revelar="barra">
        <ol data-relleno className="flex gap-1.5">
          {tramos.map((t) => (
            <li key={t.cargo} className="min-w-0" style={{ flexGrow: t.meses, flexBasis: 0 }}>
              <span className="hidden truncate pb-1.5 pl-1 text-[11px] text-muted sm:block">{t.cargo}</span>
              <span
                className={`flex h-8 items-center overflow-hidden rounded-full px-3 text-xs font-medium ${ESTILO[t.tipo]}`}
              >
                <span className="hidden truncate tabular-nums sm:inline">{t.texto}</span>
              </span>
              <span className="sr-only">
                {t.cargo}, {t.texto}: {t.periodo}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* En celular los textos no entran en las pastillas: van como leyenda */}
      <ul aria-hidden className="mt-2 space-y-0.5 text-xs text-muted sm:hidden">
        {tramos.map((t) => (
          <li key={t.cargo} className="flex justify-between gap-2">
            <span className="truncate">{t.cargo}</span>
            <span className="shrink-0 tabular-nums">{t.texto}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 hidden text-right text-[11px] text-muted sm:block">
        {Math.round(total / 12)} años de carrera · el tramo rayado es una proyección
      </p>
    </section>
  );
}
