import { idiomas } from "@/data/experiencia";
import { formacion } from "@/data/formacion";

// Formación (como movimiento "Inversión") e idiomas.
export function Formacion() {
  return (
    <>
      <h2 className="text-base font-semibold tracking-tight">Formación</h2>
      <ul className="mt-3 space-y-2">
        {formacion.map((f) => (
          <li key={f.titulo} className="flex items-center gap-3 rounded-lg bg-bg p-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium leading-tight">{f.titulo}</p>
              <p className="text-[11px] text-muted">
                {f.institucion} · {f.desde ? `${f.desde}–` : ""}
                {f.fecha}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold">Inversión</span>
          </li>
        ))}
      </ul>
      <h3 className="mt-4 text-sm font-semibold tracking-tight">Idiomas</h3>
      <ul className="mt-1.5 space-y-1 text-[13px]">
        {idiomas.map((i) => (
          <li key={i.idioma} className="flex justify-between gap-2">
            {i.idioma}
            <span className="text-muted">{i.nivel}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
