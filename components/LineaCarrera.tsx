"use client";

import { useState } from "react";
import {
  claseAtenuado,
  useDisparador,
  useResaltado,
} from "@/components/Resaltado";
import { useRevelar } from "@/components/useRevelar";
import type { TramoCarrera } from "@/lib/resumen";

const ESTILO: Record<TramoCarrera["tipo"], string> = {
  otro: "border border-ink/25 text-ink",
  consejo: "bg-ink text-card",
  proyeccion: "rayado border border-ink/30 text-ink",
};

function Pastilla({
  t,
  i,
  total,
}: {
  t: TramoCarrera;
  i: number;
  total: number;
}) {
  const { clave } = useResaltado();
  const disparador = useDisparador(t.clave);
  // El cartel sale solo cuando el resaltado nace en esta pastilla (no desde otra tarjeta)
  const [propio, setPropio] = useState(false);
  const activo = propio && clave === t.clave;

  return (
    <li
      className={`relative min-w-0 transition-opacity duration-200 ${claseAtenuado(clave, t.clave)}`}
      style={{ flexGrow: t.meses, flexBasis: 0 }}
    >
      <span className="hidden truncate pb-1.5 pl-1 text-[11px] text-muted sm:block">
        {t.cargo}
      </span>
      <button
        type="button"
        {...disparador}
        onPointerEnter={() => setPropio(true)}
        onPointerLeave={() => setPropio(false)}
        onFocus={() => {
          setPropio(true);
          disparador.onFocus();
        }}
        onBlur={() => {
          setPropio(false);
          disparador.onBlur();
        }}
        aria-label={`${t.cargo}, ${t.texto}: ${t.periodo}`}
        data-pastilla
        style={{ "--retraso": `${0.25 + i * 0.18}s` } as React.CSSProperties}
        className={`flex h-8 w-full cursor-default items-center overflow-hidden rounded-full px-3 text-xs font-medium ${ESTILO[t.tipo]}`}
      >
        <span className="hidden truncate tabular-nums sm:inline">
          {t.texto}
        </span>
      </button>

      {/* "Estás acá": punto que late donde termina lo real y empieza la proyección */}
      {t.tipo === "proyeccion" && (
        <span
          aria-hidden
          className="absolute -left-[7px] bottom-[11px] z-10 size-2.5"
        >
          <span className="latido absolute inset-0 rounded-full bg-accent" />
          <span className="absolute inset-0 rounded-full border-2 border-ink bg-accent" />
        </span>
      )}

      {/* Cartel con el período al resaltar */}
      {activo && (
        <span
          role="tooltip"
          className={`absolute top-full z-20 mt-2 whitespace-nowrap ${
            i === 0
              ? "left-0"
              : i === total - 1
                ? "right-0"
                : "left-1/2 -translate-x-1/2"
          } rounded-lg bg-ink px-2.5 py-1.5 text-[11px] text-card shadow-sm`}
        >
          <strong className="font-semibold">{t.cargo}</strong> · {t.periodo} ·{" "}
          {t.texto}
        </span>
      )}
    </li>
  );
}

// Barra horizontal de la carrera: un tramo por puesto, ancho proporcional a su duración.
// El último tramo (Data Analyst) es la proyección, rayado en amarillo.
// Al pasar o tocar un tramo se resalta el mismo puesto en el anillo y en la experiencia laboral.
export function LineaCarrera({ tramos }: { tramos: TramoCarrera[] }) {
  const ref = useRevelar<HTMLDivElement>(0.5);
  const total = tramos.reduce((a, t) => a + t.meses, 0);

  return (
    <section id="carrera" aria-labelledby="carrera-titulo">
      <h2 id="carrera-titulo" className="sr-only">
        Línea de carrera
      </h2>
      <div ref={ref} data-revelar="carrera">
        <ol className="flex gap-1.5">
          {tramos.map((t, i) => (
            <Pastilla key={t.clave} t={t} i={i} total={tramos.length} />
          ))}
        </ol>
      </div>

      {/* En celular los textos no entran en las pastillas: van como leyenda */}
      <ul aria-hidden className="mt-2 space-y-0.5 text-xs text-muted sm:hidden">
        {tramos.map((t) => (
          <li key={t.clave} className="flex justify-between gap-2">
            <span className="truncate">{t.cargo}</span>
            <span className="shrink-0 tabular-nums">{t.texto}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 hidden text-right text-[11px] text-muted sm:block">
        {Math.round(total / 12)} años de carrera · pasá el mouse por un tramo ·
        el rayado es una proyección
      </p>
    </section>
  );
}
