import { experiencia } from "@/data/experiencia";
import { duracion, formatoCorto, formatoMes } from "@/lib/fechas";

function Periodo({ desde, hasta }: { desde: string; hasta: string | null }) {
  return (
    <span className="text-[13px] text-muted">
      {formatoMes(desde)} – {hasta ? formatoMes(hasta) : "actualidad"} · {formatoCorto(duracion(desde, hasta))}
    </span>
  );
}

function Tareas({ tareas }: { tareas: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-sm">
      {tareas.map((t) => (
        <li key={t} className="flex gap-2">
          <span aria-hidden className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-accent" />
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
      <h2 className="text-lg font-semibold tracking-tight">Experiencia laboral</h2>
      <p className="text-[13px] text-muted">{actual.organizacion}</p>

      <div className="mt-4 rounded-xl bg-bg p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="font-semibold tracking-tight">{actual.cargo}</h3>
          <Periodo desde={actual.desde} hasta={actual.hasta} />
        </div>
        <Tareas tareas={actual.tareas} />
      </div>

      <div className="mt-2 divide-y divide-track">
        {anteriores.map((p) => (
          <details key={p.cargo} className="group py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-md [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block font-medium">{p.cargo}</span>
                <Periodo desde={p.desde} hasta={p.hasta} />
              </span>
              <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 transition-transform group-open:rotate-180">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" />
              </svg>
            </summary>
            <Tareas tareas={p.tareas} />
          </details>
        ))}
      </div>
    </>
  );
}
