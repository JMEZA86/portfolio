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

function FilaMovil({ t, max, i }: { t: TramoCarrera; max: number; i: number }) {
  const { clave } = useResaltado();
  const disparador = useDisparador(t.clave);
  return (
    <button
      type="button"
      {...disparador}
      aria-label={`${t.cargo}${t.grupo ? ` (${t.grupo})` : ""}, ${t.texto}: ${t.periodo}`}
      className={`grid w-full cursor-default grid-cols-[9.75rem_1fr_3.75rem] items-center gap-2 py-1 text-left text-xs transition-opacity duration-200 ${claseAtenuado(
        clave,
        t.clave,
      )}`}
    >
      <span className={`truncate ${t.grupo ? "pl-2" : ""}`}>{t.cargo}</span>
      <span className="h-3 rounded-full bg-track">
        <span
          data-barra="h"
          className={`block h-full rounded-full ${
            t.tipo === "proyeccion"
              ? "rayado border border-ink/30"
              : t.tipo === "otro"
                ? "border border-ink/30 bg-card"
                : "bg-ink"
          }`}
          style={
            {
              width: `${Math.max((t.meses / max) * 100, 6)}%`,
              "--retraso": `${0.2 + i * 0.1}s`,
            } as React.CSSProperties
          }
        />
      </span>
      <span className="text-right text-muted tabular-nums">{t.texto}</span>
    </button>
  );
}

function CarreraMovil({ tramos }: { tramos: TramoCarrera[] }) {
  const ref = useRevelar<HTMLDivElement>(0.3);
  const max = Math.max(...tramos.map((t) => t.meses));
  return (
    <div
      ref={ref}
      data-revelar="barras"
      className="rounded-card bg-card p-3 sm:p-4 lg:hidden"
    >
      <ol>
        {tramos.map((t, i) => (
          <li key={t.clave}>
            {t.grupo && tramos[i - 1]?.grupo !== t.grupo && (
              <span className="mt-1 block text-xs font-semibold first:mt-0">
                {t.grupoTexto}
              </span>
            )}
            {!t.grupo && (
              <span
                className="mt-1 block border-t border-track pt-1"
                aria-hidden
              />
            )}
            <FilaMovil t={t} max={max} i={i} />
          </li>
        ))}
      </ol>
    </div>
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
        <ol className="hidden gap-1.5 lg:flex">
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

      {/* En celular: gráfico de barras horizontales, una fila por puesto, agrupadas por organización */}
      <CarreraMovil tramos={tramos} />
      <p className="mt-1.5 hidden text-right text-[11px] text-muted lg:block">
        {Math.round(total / 12)} años de carrera · pasá el mouse por un tramo ·
        el rayado es una proyección
      </p>
    </section>
  );
}
