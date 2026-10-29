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

type Posicion = { primero: boolean; ultimo: boolean };

function Pastilla({
  t,
  i,
  total,
  grupo,
}: {
  t: TramoCarrera;
  i: number;
  total: number;
  grupo: Posicion;
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
      {/* Organización: una línea que agrupa los puestos seguidos del mismo lugar */}
      <span aria-hidden className="relative hidden h-5 sm:block">
        {t.grupo && grupo.primero && (
          <span className="absolute top-0 left-1 text-[11px] font-semibold whitespace-nowrap">
            {t.grupoTexto}
          </span>
        )}
        {t.grupo && (
          <span
            className={`absolute bottom-1.5 h-px bg-ink/35 ${grupo.primero ? "left-1" : "left-0"} ${
              grupo.ultimo ? "right-1" : "-right-1.5"
            }`}
          />
        )}
      </span>
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
        aria-label={`${t.cargo}${t.grupo ? ` (${t.grupo})` : ""}, ${t.texto}: ${t.periodo}`}
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
          <strong className="font-semibold">{t.cargo}</strong>
          {t.grupo ? ` · ${t.grupo}` : ""} · {t.periodo} · {t.texto}
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
            <Pastilla
              key={t.clave}
              t={t}
              i={i}
              total={tramos.length}
              grupo={{
                primero: tramos[i - 1]?.grupo !== t.grupo,
                ultimo: tramos[i + 1]?.grupo !== t.grupo,
              }}
            />
          ))}
        </ol>
      </div>

      {/* En celular los textos no entran en las pastillas: van como leyenda */}
      <ul aria-hidden className="mt-2 space-y-0.5 text-xs text-muted sm:hidden">
        {tramos.map((t, i) => (
          <li key={t.clave}>
            {/* En celular, la organización va como subtítulo del grupo */}
            {t.grupo && tramos[i - 1]?.grupo !== t.grupo && (
              <span className="mt-1.5 block font-semibold text-ink first:mt-0">
                {t.grupoTexto}
              </span>
            )}
            <span
              className={`flex justify-between gap-2 ${t.grupo ? "pl-2" : "mt-1.5"}`}
            >
              <span className="truncate">{t.cargo}</span>
              <span className="shrink-0 tabular-nums">{t.texto}</span>
            </span>
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
