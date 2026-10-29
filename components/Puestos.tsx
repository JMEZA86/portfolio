"use client";

import { useResaltado } from "@/components/Resaltado";
import { CONSEJO, CONSEJO_SIGLA, experiencia } from "@/data/experiencia";
import { duracion, formatoCorto, formatoMes } from "@/lib/fechas";

function Periodo({ desde, hasta }: { desde: string; hasta: string | null }) {
  return (
    <span className="text-xs text-muted">
      {formatoMes(desde)} – {hasta ? formatoMes(hasta) : "actualidad"} ·{" "}
      {formatoCorto(duracion(desde, hasta))}
    </span>
  );
}

function Tareas({ tareas }: { tareas: string[] }) {
  return (
    <ul className="mt-2 grid gap-x-5 gap-y-1 text-[13px] leading-snug lg:grid-cols-2">
      {tareas.map((t) => (
        <li key={t} className="flex gap-2">
          <span
            aria-hidden
            className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-accent"
          />
          {t}
        </li>
      ))}
    </ul>
  );
}

type Puesto = (typeof experiencia)[number];

// Puestos seguidos de la misma organización, del más reciente al más viejo.
function agrupar(puestos: Puesto[]) {
  const grupos: { organizacion: string; puestos: Puesto[] }[] = [];
  for (const p of puestos) {
    const ultimo = grupos.at(-1);
    if (ultimo?.organizacion === p.organizacion) ultimo.puestos.push(p);
    else grupos.push({ organizacion: p.organizacion, puestos: [p] });
  }
  return grupos;
}

// Lo que hace Jorge, agrupado por organización: el puesto actual abierto, los anteriores plegables.
export function Puestos() {
  const { clave, resaltar } = useResaltado();
  // Resaltado compartido con la barra de carrera y el anillo
  const marca = (desde: string) =>
    clave === desde ? "rounded-lg bg-accent/30 ring-2 ring-accent" : "";
  const eventos = (desde: string) => ({
    onMouseEnter: () => resaltar(desde),
    onMouseLeave: () => resaltar(null),
  });
  const ordenados = [...experiencia].sort((a, b) =>
    b.desde.localeCompare(a.desde),
  );
  const actual = ordenados[0];

  return (
    <>
      <h2 className="text-base font-semibold tracking-tight">
        Experiencia laboral
      </h2>

      {agrupar(ordenados).map((g) => {
        const desde = g.puestos.map((p) => p.desde).sort()[0];
        const hasta = g.puestos.some((p) => p.hasta === null)
          ? null
          : g.puestos
              .map((p) => p.hasta!)
              .sort()
              .at(-1)!;
        const esConsejo = g.organizacion === CONSEJO;
        return (
          <section key={g.organizacion} className="mt-4 first-of-type:mt-3">
            {/* Encabezado del grupo, igual que en la barra de carrera */}
            <div className="flex flex-col gap-x-3 border-b border-ink/20 pb-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xs font-semibold whitespace-nowrap">
                {esConsejo ? CONSEJO_SIGLA : g.organizacion} ·{" "}
                {formatoCorto(duracion(desde, hasta))}
              </h3>
              {esConsejo && (
                <span className="text-[11px] text-muted sm:truncate">
                  {CONSEJO}
                </span>
              )}
            </div>

            <div className="divide-y divide-track">
              {g.puestos.map((p) => {
                if (p === actual)
                  return (
                    <div
                      key={p.cargo}
                      {...eventos(p.desde)}
                      className={`mt-2 mb-1 rounded-xl bg-bg p-3.5 transition-shadow ${marca(p.desde)}`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <h4 className="text-sm font-semibold tracking-tight">
                          {p.cargo}
                        </h4>
                        <Periodo desde={p.desde} hasta={p.hasta} />
                      </div>
                      <Tareas tareas={p.tareas} />
                    </div>
                  );

                const titulo = (
                  <span className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3">
                    <span className="block text-sm font-medium">{p.cargo}</span>
                    <Periodo desde={p.desde} hasta={p.hasta} />
                  </span>
                );
                const fila = `transition-shadow ${marca(p.desde)}`;
                // Sin tareas cargadas no hay nada que desplegar
                if (p.tareas.length === 0)
                  return (
                    <div
                      key={p.cargo}
                      {...eventos(p.desde)}
                      className={`flex py-2 ${fila}`}
                    >
                      {titulo}
                    </div>
                  );
                return (
                  <details
                    key={p.cargo}
                    {...eventos(p.desde)}
                    className={`group py-2 ${fila}`}
                  >
                    <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-3 rounded-md [&::-webkit-details-marker]:hidden">
                      {titulo}
                      <svg
                        aria-hidden
                        viewBox="0 0 16 16"
                        className="size-4 shrink-0 transition-transform group-open:rotate-180"
                      >
                        <path
                          d="M4 6l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          fill="none"
                          strokeLinecap="round"
                        />
                      </svg>
                    </summary>
                    <Tareas tareas={p.tareas} />
                  </details>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
