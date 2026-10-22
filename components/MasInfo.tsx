import { idiomas, persona } from "@/data/experiencia";
import { formacion } from "@/data/formacion";

function Item({ titulo, abierto = false, children }: { titulo: string; abierto?: boolean; children: React.ReactNode }) {
  return (
    <details open={abierto} className="group border-t border-track py-2.5 first:border-t-0 first:pt-0">
      <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between rounded-md text-sm font-medium [&::-webkit-details-marker]:hidden">
        {titulo}
        <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 transition-transform group-open:rotate-180">
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" fill="none" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

// Acordeón con formación, idiomas y contacto.
export function MasInfo() {
  return (
    <div>
      <Item titulo="Formación" abierto>
        {formacion.map((f) => (
          <div key={f.titulo} className="flex items-center gap-3 rounded-lg bg-bg p-2.5">
            <div className="min-w-0 flex-1">
              <p className="text-[13px] font-medium leading-tight">{f.titulo}</p>
              <p className="text-[11px] text-muted">
                {f.institucion} · {f.desde ? `${f.desde}–` : ""}
                {f.fecha}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold">Inversión</span>
          </div>
        ))}
      </Item>
      <Item titulo="Idiomas">
        <ul className="space-y-1 text-[13px]">
          {idiomas.map((i) => (
            <li key={i.idioma} className="flex justify-between">
              {i.idioma}
              <span className="text-muted">{i.nivel}</span>
            </li>
          ))}
        </ul>
      </Item>
      <Item titulo="Contacto" abierto>
        <div className="flex flex-col gap-1.5 text-[13px] font-medium">
          <a href={`mailto:${persona.email}`} className="flex justify-between rounded-lg bg-ink px-3 py-2 text-card">
            Escribime <span aria-hidden>↗</span>
          </a>
          <a
            href={persona.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-between rounded-lg bg-track px-3 py-2"
          >
            LinkedIn <span aria-hidden>↗</span>
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
        </div>
      </Item>
    </div>
  );
}
