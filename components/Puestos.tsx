import { experiencia } from "@/data/experiencia";
import { duracion, formatoCorto, formatoMes } from "@/lib/fechas";

function Periodo({ desde, hasta }: { desde: string; hasta: string | null }) {
  return (
    <span className="text-xs text-muted">
      {formatoMes(desde)} – {hasta ? formatoMes(hasta) : "actualidad"} · {formatoCorto(duracion(desde, hasta))}
    </span>
  );
}

function Tareas({ tareas }: { tareas: string[] }) {
  return (
    <ul className="mt-2 grid gap-x-5 gap-y-1 text-[13px] leading-snug lg:grid-cols-2">
      {tareas.map((t) => (
        <li key={t} className="flex gap-2">
          <span aria-hidden className="mt-[0.4rem] size-1.5 shrink-0 rounded-full bg-accent" />
          {t}
        </li>
      ))}
    </ul>
  );
}

// Lo que hace Jorge: el puesto actual abierto, los anteriores plegables.
export function Puestos() {
  const [actual, ...anteriores] = [...experiencia].sort((a, b) => b.desde.localeCompare(a.desde));

  return (
    <>
      <h2 className="text-base font-semibold tracking-tight">Experiencia laboral</h2>
      <p className="text-xs text-muted">{actual.organizacion}</p>

      <div className="mt-3 rounded-xl bg-bg p-3.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="text-sm font-semibold tracking-tight">{actual.cargo}</h3>
          <Periodo desde={actual.desde} hasta={actual.hasta} />
        </div>
        <Tareas tareas={actual.tareas} />
      </div>

      <div className="mt-1 divide-y divide-track">
        {anteriores.map((p) => {
          const titulo = (
            <span className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3">
              <span className="block text-sm font-medium">
                {p.cargo}
                {p.organizacion !== actual.organizacion && <span className="font-normal text-muted"> · {p.organizacion}</span>}
              </span>
              <Periodo desde={p.desde} hasta={p.hasta} />
            </span>
          );
          // Sin tareas cargadas no hay nada que desplegar
          if (p.tareas.length === 0) return <div key={p.cargo} className="flex py-2">{titulo}</div>;
          return (
            <details key={p.cargo} className="group py-2">
              <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-3 rounded-md [&::-webkit-details-marker]:hidden">
                {titulo}
                <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 transition-transform group-open:rotate-180">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" />
                </svg>
              </summary>
              <Tareas tareas={p.tareas} />
            </details>
          );
        })}
      </div>
    </>
  );
}
